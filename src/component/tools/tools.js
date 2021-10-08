import { MdPause, MdReplay, MdPlayArrow } from 'react-icons/md';
import { Container, Row } from 'react-bootstrap';
import { Holonomic } from 'path-generator';
import { connect } from 'react-redux';
import React from 'react';

import { setDrawRobotInterval, changeRangePosition, changeMode } from '../../redux/view/actions';
import { saveCSVPath } from '../../handlers/project-handler';
import ToolsPathDirection from './tools-path-direction';
import { deleteAction, renameAction } from './util';
import GroupEditButton from './group-edit-button';
import SettingsButton from './settings-button';
import RenameButton from './rename-button';
import DeleteButton from './delete-button';
import ExportButton from './export-button';
import ToolsSelect from './tools-select';
import ModeButton from './mode-button';
import PlayButton from './play-button';

class Tools extends React.Component {
	onRename = (newName) => {
		const { isPathMode, pathName, paths } = this.props;
		this.props.onRename(isPathMode, paths, pathName, newName);
	};

	onExport = (setShowExportPopup, setShowIllegalPopup) => {
		const { driveType, paths, path, saveCSVTo, isWeb, isPathMode, pathName, group, pathConfig } = this.props;
		if (!path) return;
		if (saveCSVTo === '' && !isWeb) setShowExportPopup(true);
		else if (path.isIllegal()) setShowIllegalPopup(true);
		else {
			const pathsToDownload = isPathMode ? [pathName] : group;
			pathsToDownload.forEach((pathName) => {
				const path = new driveType.Path(paths[pathName].waypoints, pathConfig);
				saveCSVPath(path, pathName, saveCSVTo);
			});
			setShowExportPopup(true);
		}
	};

	getPlayButtonIcon = () => {
		const { drawRobotInterval, path, rangePosition } = this.props;
		if (drawRobotInterval) return <MdPause />;
		else if (path && path.coords.length - 1 === rangePosition) return <MdReplay />;
		else return <MdPlayArrow />;
	};

	onPlay = async () => {
		const { path, drawRobotInterval, rangePosition, robotLoopTime } = this.props;
		const { setDrawRobotInterval, changeRangePosition } = this.props;
		const canCreateInterval = () => path && !drawRobotInterval && path.coords.length > 0;
		const isRangePositionInTheEnd = () => path && path.coords.length - 1 === rangePosition;
		const updateRangePosition = () => {
			const { path, rangePosition } = this.props;
			const { setDrawRobotInterval, changeRangePosition } = this.props;
			const isRangePositionInTheEnd = () => path && path.coords.length - 1 === rangePosition;
			if (isRangePositionInTheEnd()) setDrawRobotInterval();
			else changeRangePosition(rangePosition + 1);
		};
		let interval = undefined;
		if (canCreateInterval()) {
			if (isRangePositionInTheEnd()) changeRangePosition(0);
			interval = setInterval(updateRangePosition, robotLoopTime * 1000);
		}
		setDrawRobotInterval(interval);
	};

	onDelete = async () => {
		const { paths, pathName, saveCSVTo, isPathMode } = this.props;
		this.props.deleteAction(isPathMode, paths, pathName, saveCSVTo);
	};

	render() {
		const { driveType, isPathMode, path, newVersion, pathName, isWeb, saveCSVTo } = this.props;
		const { changeMode } = this.props;
		const isDisable = !path;

		return (
			<Container>
				<Row>
					<SettingsButton newVersion={newVersion} />
					<ModeButton isPathMode={isPathMode} onChangeMode={changeMode} />
					<ToolsSelect />
					<RenameButton
						pathName={pathName}
						disabled={isDisable}
						isPathMode={isPathMode}
						onRename={this.onRename}
					/>
					<ExportButton
						path={path}
						isWeb={isWeb}
						pathName={pathName}
						disabled={isDisable}
						saveCSVTo={saveCSVTo}
						onExport={this.onExport}
					/>
					<PlayButton body={this.getPlayButtonIcon()} path={path} onPlay={this.onPlay} />
					<DeleteButton
						disabled={isDisable}
						pathName={pathName}
						isPathMode={isPathMode}
						onDelete={this.onDelete}
					/>

					{!isPathMode && <GroupEditButton disabled={pathName === undefined} />}
					{isPathMode && driveType !== Holonomic && <ToolsPathDirection />}
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path,
		paths: state.paths,
		isWeb: state.isWeb,
		pathName: state.selected,
		saveCSVTo: state.saveCSVTo,
		driveType: state.driveType,
		newVersion: state.newVersion,
		pathConfig: state.pathConfig,
		isPathMode: state.isPathMode,
		rangePosition: state.rangePosition,
		group: state.groups[state.selected],
		drawRobotInterval: state.drawRobotInterval,
		robotLoopTime: state.pathConfig.robotLoopTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setDrawRobotInterval: (interval) => dispatch(setDrawRobotInterval(interval)),
		changeRangePosition: (position) => dispatch(changeRangePosition(position)),
		changeMode: () => dispatch(changeMode()),
		deleteAction: async (isPathMode, paths, selected, saveCSVTo) =>
			dispatch(await deleteAction(isPathMode, paths, selected, saveCSVTo)),
		onRename: async (isPathMode, paths, oldName, newName) =>
			dispatch(await renameAction(isPathMode, paths, oldName, newName)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
