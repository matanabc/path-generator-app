import { deletePath, renamePath, addPath } from '../../redux/path/actions';
import { changePopupsStatus, changeRangePosition } from '../../redux/view/actions';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Popup from './popup';
import React from 'react';

class Popups extends React.Component {
	constructor(props) {
		super(props);
		this.newPathRef = React.createRef();
		this.renamePathRef = React.createRef();
		this.renamePath = this.renamePath.bind(this);
		this.deletePath = this.deletePath.bind(this);
		this.createNewPath = this.createNewPath.bind(this);
	}

	componentDidUpdate() {
		if (this.props.popupsStatus.renamePathPopup)
			this.renamePathRef.current.defaultValue = this.props.pathName;
	}

	deletePath() {
		this.props.closePopups();
		this.props.deletePath();
	}

	renamePath() {
		if (this.renamePathRef.current.value) {
			this.props.renamePath(this.renamePathRef.current.value);
			this.props.closePopups();
		}
	}

	createNewPath() {
		if (
			this.newPathRef.current.value &&
			!this.props.pathsName.includes(this.newPathRef.current.value)
		) {
			this.props.addPath(this.newPathRef.current.value);
			this.props.resetRangePosition();
			this.props.closePopups();
		}
	}

	render() {
		return (
			<div>
				<Popup
					show={this.props.popupsStatus.deletePathPopup}
					body="Are you sure you want to delete path?"
					close={this.props.closePopups}
					confirm={this.deletePath}
					title="Delete path"
				/>

				<Popup
					show={this.props.popupsStatus.renamePathPopup}
					body={<FormControl ref={this.renamePathRef} />}
					close={this.props.closePopups}
					refToUse={this.renamePathRef}
					confirm={this.renamePath}
					title="Rename path"
				/>

				<Popup
					body={<FormControl ref={this.newPathRef} placeholder="Path name" />}
					show={this.props.popupsStatus.createNewPathPopup}
					close={this.props.closePopups}
					confirm={this.createNewPath}
					title="Create a new path"
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathName: state.path.selectedPath ? state.path.selectedPath : '',
		path: state.path.paths[state.path.selectedPath],
		pathsName: Object.keys(state.path.paths),
		popupsStatus: state.view.popupsStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetRangePosition: () => dispatch(changeRangePosition(0)),
		closePopups: () => dispatch(changePopupsStatus()),
		renamePath: (name) => dispatch(renamePath(name)),
		addPath: (name) => dispatch(addPath(name)),
		deletePath: () => dispatch(deletePath()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Popups);
