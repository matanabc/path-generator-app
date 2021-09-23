import { changePopupsStatus, changeRangePosition } from '../../redux/view/actions';
import { deleteAction, renameAction, createNewAction } from './util';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Popup from './popup';
import React from 'react';

class Popups extends React.Component {
	constructor(props) {
		super(props);
		this.newPathRef = React.createRef();
		this.renamePathRef = React.createRef();
	}

	componentDidUpdate() {
		if (this.props.popupsStatus.renamePopup) this.renamePathRef.current.defaultValue = this.props.pathName;
	}

	deleteAction = async () => {
		await this.props.deleteAction(this.props.globalState);
		this.props.closePopups();
	};

	renamePath = async () => {
		const { selected, paths, renameAction, closePopups } = this.props;
		if (this.renamePathRef.current.value) {
			await renameAction(isPathMode, paths, selected, this.renamePathRef.current.value);
			closePopups();
		}
	};

	createNew = async () => {
		const { isPathMode, paths, pathConfig, driveType, pathsName } = this.props;
		if (this.newPathRef.current.value && !pathsName.includes(this.newPathRef.current.value)) {
			await this.props.createNewAction(isPathMode, paths, pathConfig, driveType, this.newPathRef.current.value);
			this.props.resetRangePosition();
			this.props.closePopups();
		}
	};

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
					show={this.props.popupsStatus.renamePopup}
					body={<FormControl ref={this.renamePathRef} />}
					close={this.props.closePopups}
					refToUse={this.renamePathRef}
					confirm={this.renamePath}
					title={`Rename ${type}`}
				/>

				<Popup
					body={<FormControl ref={this.newPathRef} placeholder={`${type} name`} />}
					show={this.props.popupsStatus.createNewPopup}
					close={this.props.closePopups}
					confirm={this.createNew}
					refToUse={this.newPathRef}
					title={`Create a new ${type}`}
				/>

				<Popup
					show={this.props.popupsStatus.pathIsIllegalPopup}
					title={this.props.path && this.props.path.isIllegal() && this.props.path.error.message}
					body={
						<div>
							{this.props.path &&
								this.props.path.isIllegal() &&
								this.props.path.error.position &&
								`${this.props.path.error.position}\n\n`}
							{this.props.path &&
								this.props.path.isIllegal() &&
								this.props.path.error.problem &&
								`${this.props.path.error.problem}\n\n`}
							{this.props.path && this.props.path.isIllegal() && `${this.props.path.error.solution}!`}
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
		pathConfig: state.pathConfig,
		driveType: state.driveType,
		saveCSVTo: state.saveCSVTo,
		selected: state.selected,
		isWeb: state.isWeb,
		globalState: state,
		paths: state.paths,
		path: state.path,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createNewAction: async (isPathMode, paths, pathConfig, driveType, name) =>
			dispatch(await createNewAction(isPathMode, paths, pathConfig, driveType, name)),
		renameAction: async (isPathMode, paths, oldName, newName) =>
			dispatch(await renameAction(isPathMode, paths, oldName, newName)),
		deleteAction: async (state) => dispatch(await deleteAction(state)),
		resetRangePosition: () => dispatch(changeRangePosition(0)),
		closePopups: () => dispatch(changePopupsStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Popups);
