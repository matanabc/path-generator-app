import { saveCSVPath } from '../../handlers/project-handler';

export async function downloadPath(props) {
	if (props.path.isIllegal()) {
		props.showIllegalPathPopup();
		return;
	}

	const pathsToDownload = props.isPathMode ? [props.pathName] : props.group;
	pathsToDownload.forEach((pathName) => {
		const path = new props.driveType.Path(props.paths[pathName].waypoints, props.pathConfig);
		saveCSVPath(path, pathName, props.saveCSVTo);
	});
	props.showCSVSavePopup();
}
