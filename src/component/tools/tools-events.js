import { saveCSVPath } from '../../handlers/project-handler';
import { PopupsConfig } from '../popups/popups-config';

export async function onDownloadClick(props) {
	const { driveType, paths, path, saveCSVTo, isWeb, isPathMode, pathName, group, pathConfig } = props;
	const { showIllegalPathPopup, showCSVSavePopup } = props;
	if (document.activeElement) document.activeElement.blur();
	if (!path || (saveCSVTo === '' && !isWeb)) return;
	if (path.isIllegal()) {
		showIllegalPathPopup();
	} else {
		const pathsToDownload = isPathMode ? [pathName] : group;
		pathsToDownload.forEach((pathName) => {
			const path = new driveType.Path(paths[pathName].waypoints, pathConfig);
			saveCSVPath(path, pathName, saveCSVTo);
		});
		showCSVSavePopup();
	}
}

export async function onSettingsClick(props) {
	if (document.activeElement) document.activeElement.blur();
	props.showSettings();
}

export async function onPlayClick(props, updateRangePosition) {
	const { path, drawRobotInterval, popupsStatus, rangePosition, robotLoopTime } = props;
	const { setDrawRobotInterval, changeRangePosition } = props;
	const canCreateInterval = () => path && !drawRobotInterval && path.coords.length > 0 && !popupsStatus.settingsPopup;
	const isRangePositionInTheEnd = () => path && path.coords.length - 1 === rangePosition;

	if (JSON.stringify(popupsStatus) !== JSON.stringify(new PopupsConfig())) return;
	if (document.activeElement) document.activeElement.blur();
	let interval = undefined;
	if (canCreateInterval()) {
		if (isRangePositionInTheEnd()) changeRangePosition(0);
		interval = setInterval(updateRangePosition, robotLoopTime * 1000);
	}
	setDrawRobotInterval(interval);
}

export async function onDeleteClick(props) {
	const { path, showDeletePopup } = props;
	if (document.activeElement) document.activeElement.blur();
	if (path) showDeletePopup();
}

export async function onRenameClick(props) {
	const { path, showRenamePopup } = props;
	if (document.activeElement) document.activeElement.blur();
	if (path) showRenamePopup();
}
