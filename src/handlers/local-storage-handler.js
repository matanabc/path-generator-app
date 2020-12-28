import { addPath } from '../redux/path/actions';
import { Swerve } from 'path-generator';

export default class LocalStorageHandler {
	constructor(callback) {
		this.dispatch = callback;
		this.load();
	}

	async load() {
		this.loadJsonProject();
		this.loadRobotDrawConfig();
		this.loadFieldConfig();
		this.loadFieldImage();
		this.loadPathConfig();
		this.loadPaths();
	}

	loadJsonProject() {
		try {
			this.jsonProject = JSON.parse(localStorage.getItem('project settings'));
		} catch (error) {
			this.jsonProject = undefined;
		}
	}

	async loadRobotDrawConfig() {}

	async loadFieldConfig() {}

	async loadFieldImage(image) {}

	async loadPathConfig() {}

	async loadPaths() {
		Object.keys(localStorage).forEach((key) => {
			if (key.startsWith('path/')) this.loadPath(key);
		});
	}

	async loadPath(key) {
		try {
			const path = JSON.parse(localStorage.getItem(key));
			this.dispatch(addPath(key.replace('path/', ''), path.waypoints, path.isInReverse));
		} catch (error) {}
	}

	async saveJsonProject(settings) {
		const projectSettings = { ...settings };
		projectSettings.driveType = settings.driveType === Swerve ? 'swerve' : 'tank';
		localStorage.setItem('project settings', JSON.stringify(projectSettings));
	}

	async saveJsonPath(pathName, path) {
		const data = { isInReverse: path.isReverse(), waypoints: path.waypoints };
		localStorage.setItem(`path/${pathName}`, JSON.stringify(data));
	}

	async saveCSVPath(path, pathName, csvFolder) {}

	async deletePath(pathName) {
		localStorage.removeItem(`path/${pathName}`);
	}

	async renameJsonPath(oldName, newName) {}
}
