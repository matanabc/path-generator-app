import { changePopupsStatus, changeRangePosition } from '../../redux/view/actions';
import { deleteAction, renameAction } from './util';
import { addPath } from '../../redux/path/actions';
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
		this.deleteAction = this.deleteAction.bind(this);
		this.createNewPath = this.createNewPath.bind(this);
	}

	componentDidUpdate() {
		if (this.props.popupsStatus.renamePathPopup) this.renamePathRef.current.defaultValue = this.props.pathName;
	}

	deleteAction() {
		this.props.closePopups();
		this.props.deleteAction(this.props.isPathMode);
	}

	renamePath() {
		if (this.renamePathRef.current.value) {
			this.props.renameAction(this.props.isPathMode, this.renamePathRef.current.value);
			this.props.closePopups();
		}
	}

	createNewPath() {
		if (this.newPathRef.current.value && !this.props.pathsName.includes(this.newPathRef.current.value)) {
			this.props.addPath(this.newPathRef.current.value);
			this.props.resetRangePosition();
			this.props.closePopups();
		}
	}

	render() {
		const type = this.props.isPathMode ? 'path' : 'group';
		return (
			<div>
				<Popup
					show={this.props.popupsStatus.deletePopup}
					body={`Are you sure you want to delete ${type}?`}
					close={this.props.closePopups}
					confirm={this.deleteAction}
					title={`Delete ${type}`}
				/>

				<Popup
					show={this.props.popupsStatus.renamePathPopup}
					body={<FormControl ref={this.renamePathRef} />}
					close={this.props.closePopups}
					refToUse={this.renamePathRef}
					confirm={this.renamePath}
					title={`Rename ${type}`}
				/>

				<Popup
					body={<FormControl ref={this.newPathRef} placeholder="Path name" />}
					show={this.props.popupsStatus.createNewPathPopup}
					close={this.props.closePopups}
					confirm={this.createNewPath}
					refToUse={this.newPathRef}
					title="Create a new path"
				/>

				<Popup
					show={this.props.popupsStatus.pathIsIllegalPopup}
					title={this.props.path && this.props.path.isIllegal() ? this.props.path.error.info : ''}
					body={
						<div>
							{this.props.path && this.props.path.isIllegal()
								? `${this.props.path.error.problem}\n \n${this.props.path.error.solution}`
								: ''}
						</div>
					}
					close={this.props.closePopups}
				/>

				<Popup
					title={`v${this.props.newVersion} is available`}
					show={this.props.popupsStatus.newVersionPopup}
					close={this.props.closePopups}
					body={
						<div>
							{'There is a new version waiting for you to update to!\n' +
								'To update jest go to settings and click on update...'}
						</div>
					}
				/>

				<Popup
					show={
						this.props.popupsStatus.savePathToCSVPopup && this.props.saveCSVTo === '' && !this.props.isWeb
					}
					title="Save path CSV"
					body="Can't save path CSV, you need to set CSV folder path in settings!"
					close={this.props.closePopups}
				/>

				<Popup
					show={this.props.popupsStatus.savePathToCSVPopup && this.props.saveCSVTo !== ''}
					title="Save path CSV"
					body="Path CSV saved!"
					close={this.props.closePopups}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathName: state.selected ? state.selected : '',
		pathsName: Object.keys(state.paths),
		popupsStatus: state.popupsStatus,
		newVersion: state.newVersion,
		isPathMode: state.isPathMode,
		saveCSVTo: state.saveCSVTo,
		isWeb: state.isWeb,
		path: state.path,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		renameAction: (isPathMode, name) => dispatch(renameAction(isPathMode, name)),
		deleteAction: (isPathMode) => dispatch(deleteAction(isPathMode)),
		resetRangePosition: () => dispatch(changeRangePosition(0)),
		closePopups: () => dispatch(changePopupsStatus()),
		addPath: (name) => dispatch(addPath(name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Popups);
