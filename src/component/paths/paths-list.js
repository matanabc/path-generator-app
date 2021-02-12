import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { changeOrder } from '../../redux/group/actions';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class PathsList extends React.Component {
	constructor(props) {
		super(props);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.getListOfPathsItem = this.getListOfPathsItem.bind(this);
	}

	onDragEnd(result) {
		if (!result.destination) return;
		this.props.changeOrder(result.source.index, result.destination.index);
	}

	getListOfPathsItem() {
		return this.props.groupPaths.map((pathName, index) => (
			<Draggable key={pathName} draggableId={pathName} index={index}>
				{(provided, snapshot) => (
					<Alert
						className={index > 0 ? 'mb-0 mt-2' : 'mb-0 mt-0'}
						variant={this.props.pathsName.includes(pathName) ? 'primary' : 'danger'}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						{pathName}
						<div style={{ float: 'right' }}>
							<Button className="mr-2" variant="danger">
								<MdDelete />
							</Button>
							<Button variant={this.props.color}>
								<MdEdit />
							</Button>
						</div>
					</Alert>
				)}
			</Draggable>
		));
	}

	render() {
		return (
			<div className="AppListView">
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{this.getListOfPathsItem()}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathsName: Object.keys(state.paths),
		groupPaths: state.groups[state.selected] ? state.groups[state.selected] : [],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeOrder: (source, destination) => dispatch(changeOrder(source, destination)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PathsList);
