import { DOWNLOAD_SHORTCUT, SETTINGS_SHORTCUT, PLAY_SHORTCUT, DELETE_SHORTCUT, RENAME_SHORTCUT } from '../../shortcut';
import { FiDownload, MdError, MdBuild, MdPause, MdReplay, MdPlayArrow, MdDelete, MdEdit } from 'react-icons/all';
import { onDownloadClick, onSettingsClick, onPlayClick, onDeleteClick, onRenameClick } from './tools-events';
import { changePopupsStatus, setDrawRobotInterval, changeRangePosition } from '../../redux/view/actions';
import ToolsPathDirection from './tools-path-direction';
import { Container, Row } from 'react-bootstrap';
import ToolsAddPath from './tools-add-path';
import { Holonomic } from 'path-generator';
import ToolsSelect from './tools-select';
import ToolsButton from './tools-button';
import { connect } from 'react-redux';
import React from 'react';

class Tools extends React.Component {
	getPlayButtonIcon = () => {
		const { drawRobotInterval, path, rangePosition } = this.props;
		if (drawRobotInterval) return <MdPause />;
		else if (path && path.coords.length - 1 === rangePosition) return <MdReplay />;
		else return <MdPlayArrow />;
	};

	updateRangePosition = () => {
		const { path, rangePosition } = this.props;
		const { setDrawRobotInterval, changeRangePosition } = this.props;
		const isRangePositionInTheEnd = () => path && path.coords.length - 1 === rangePosition;
		if (isRangePositionInTheEnd()) setDrawRobotInterval();
		else changeRangePosition(rangePosition + 1);
	};

	render() {
		const { driveType, isPathMode, path, newVersion } = this.props;
		const isPathIllegal = path && path.isIllegal();
		return (
			<Container>
				<Row>
					<ToolsButton
						title="Settings"
						body={<MdBuild />}
						shortcut={SETTINGS_SHORTCUT}
						onClick={() => onSettingsClick(this.props)}
						variant={newVersion ? 'success' : 'primary'}
					/>
					<ToolsSelect />
					<ToolsButton
						title="Rename"
						disabled={!path}
						body={<MdEdit />}
						shortcut={RENAME_SHORTCUT}
						onClick={() => onRenameClick(this.props)}
					/>
					<ToolsButton
						disabled={!path}
						title="Save csv path"
						shortcut={DOWNLOAD_SHORTCUT}
						onClick={() => onDownloadClick(this.props)}
						variant={isPathIllegal ? 'danger' : 'primary'}
						body={isPathIllegal ? <MdError /> : <FiDownload />}
					/>
					<ToolsButton
						shortcut={PLAY_SHORTCUT}
						body={this.getPlayButtonIcon()}
						onClick={() => onPlayClick(this.props, this.updateRangePosition)}
						disabled={!path || path.waypoints.length <= 1 || path.isIllegal()}
					/>
					<ToolsButton
						title="Delete"
						variant="danger"
						disabled={!path}
						body={<MdDelete />}
						shortcut={DELETE_SHORTCUT}
						onClick={() => onDeleteClick(this.props)}
					/>
					{!isPathMode && <ToolsAddPath />}
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
		popupsStatus: state.popupsStatus,
		rangePosition: state.rangePosition,
		group: state.groups[state.selected],
		drawRobotInterval: state.drawRobotInterval,
		robotLoopTime: state.pathConfig.robotLoopTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showIllegalPathPopup: () => dispatch(changePopupsStatus('pathIsIllegalPopup')),
		setDrawRobotInterval: (interval) => dispatch(setDrawRobotInterval(interval)),
		changeRangePosition: (position) => dispatch(changeRangePosition(position)),
		showCSVSavePopup: () => dispatch(changePopupsStatus('savePathToCSVPopup')),
		showRenamePopup: () => dispatch(changePopupsStatus('renamePopup')),
		showDeletePopup: () => dispatch(changePopupsStatus('deletePopup')),
		showSettings: () => dispatch(changePopupsStatus('settingsPopup')),
		closeSettings: () => dispatch(changePopupsStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
