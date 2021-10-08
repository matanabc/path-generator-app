import { DragDropContext } from 'react-beautiful-dnd';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

import { updateGroup } from '../redux/group/actions';
import DragAndDropList from './drag-and-drop-list';

class GroupInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], selected: [] };
	}

	componentDidUpdate(props) {
		const { paths, groupPaths } = this.props;
		if (JSON.stringify(props) !== JSON.stringify(this.props))
			this.setState({ items: paths.filter((path) => !groupPaths.includes(path)), selected: groupPaths });
	}

	reorder = (source, destination) => {
		const newList = Array.from(this.state[source.droppableId]);
		const [removed] = newList.splice(source.index, 1);
		newList.splice(destination.index, 0, removed);
		const result = {};
		result[destination.droppableId] = newList;
		return result;
	};

	move = (source, destination) => {
		const sourceClone = Array.from(this.state[source.droppableId]);
		const destClone = Array.from(this.state[destination.droppableId]);
		const [removed] = sourceClone.splice(source.index, 1);
		destClone.splice(destination.index, 0, removed);
		const result = {};
		result[source.droppableId] = sourceClone;
		result[destination.droppableId] = destClone;
		return result;
	};

	onDragEnd = (result) => {
		const { source, destination } = result;
		if (!destination) return;
		if (source.droppableId === destination.droppableId) this.setState(this.reorder(source, destination));
		else this.setState(this.move(source, destination));
	};

	onClose = (group) => {
		this.props.onClose();
		this.props.updateGroup(group);
	};

	render() {
		const { show, selected } = this.props;
		return (
			<Modal show={show} onHide={() => this.onClose(this.state.selected)} size={'lg'} centered>
				<Modal.Header closeButton>
					<Modal.Title>{`${selected} Group Info`}</Modal.Title>
				</Modal.Header>

				<Modal.Body style={{ display: 'flex', height: '100%', width: '100%', textAlign: 'center' }}>
					<DragDropContext onDragEnd={this.onDragEnd}>
						<DragAndDropList id={'items'} title={'paths to use'} items={this.state.items} />
						<DragAndDropList
							id={'selected'}
							title={'paths in group'}
							items={this.state.selected}
							style={{ margin: '0 0 0 auto' }}
						/>
					</DragDropContext>
				</Modal.Body>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selected: state.selected,
		paths: Object.keys(state.paths),
		groupPaths: state.groups[state.selected] ? state.groups[state.selected] : [],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateGroup: (group) => dispatch(updateGroup(group)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfo);
