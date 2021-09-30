import { changePopupsStatus, changeRangePosition } from '../../redux/view/actions';
import { deleteAction, renameAction, createNewAction } from './util';
import ConfirmPopup from './confirm-popup';
import PromptPopup from './prompt-popup';
import AlertPopup from './alert-popup';
import { connect } from 'react-redux';
import React from 'react';

class Popups extends React.Component {
	deleteAction = async () => {
		await this.props.deleteAction(this.props);
		this.props.closePopups();
	};

	renamePath = async (value) => {
		const { selected, paths, isPathMode } = this.props;
		if (value !== undefined) {
			await this.props.renameAction(isPathMode, paths, selected, value);
			this.props.closePopups();
		}
	};

	createNew = async (value) => {
		const { isPathMode, paths, pathConfig, driveType, pathsName } = this.props;
		if (value && !pathsName.includes(value)) {
			await this.props.createNewAction(isPathMode, paths, pathConfig, driveType, value);
			this.props.resetRangePosition();
			this.props.closePopups();
		}
	};

	render() {
		const { popupsStatus, pathName, path, newVersion, saveCSVTo, isWeb, closePopups } = this.props;
		const { pathIsIllegalPopup, newVersionPopup, savePathToCSVPopup } = popupsStatus;
		const { deletePopup, renamePopup, createNewPopup } = popupsStatus;
		const type = this.props.isPathMode ? 'path' : 'group';
		return (
			<div>
				<ConfirmPopup
					body={`Are you sure you want to delete ${type}?`}
					onConfirm={this.deleteAction}
					title={`Delete ${type}`}
					onCancel={closePopups}
					show={deletePopup}
				/>

				<PromptPopup
					onConfirm={this.renamePath}
					title={`Rename ${type}`}
					defaultValue={pathName}
					onCancel={closePopups}
					show={renamePopup}
				/>

				<PromptPopup
					title={`Create a new ${type}`}
					placeholder={`${type} name`}
					onConfirm={this.createNew}
					onCancel={closePopups}
					show={createNewPopup}
				/>

				<AlertPopup
					title={path && path.isIllegal() && path.error.message}
					show={pathIsIllegalPopup}
					onClose={closePopups}
					body={
						<div>
							{path && path.isIllegal() && path.error.position && `${path.error.position}\n\n`}
							{path && path.isIllegal() && path.error.problem && `${path.error.problem}\n\n`}
							{path && path.isIllegal() && `${path.error.solution}!`}
						</div>
					}
				/>

				<AlertPopup
					title={`v${newVersion} is available`}
					show={newVersionPopup}
					onClose={closePopups}
					body={
						<div>
							{'There is a new version waiting for you to update to!\n' +
								'To update jest go to settings and click on update...'}
						</div>
					}
				/>

				<AlertPopup
					body="Can't save path, you need to set save folder path in settings!"
					show={savePathToCSVPopup && saveCSVTo === '' && !isWeb}
					onClose={closePopups}
					title="Save path"
				/>

				<AlertPopup
					show={savePathToCSVPopup && saveCSVTo !== ''}
					onClose={closePopups}
					body="Path saved!"
					title="Save path"
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
