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

	async loadPaths() {}

	async loadPath(fileName) {}

	async saveJsonProject(settings) {
		const projectSettings = { ...settings };
		projectSettings.driveType = settings.driveType === Swerve ? 'swerve' : 'tank';
		localStorage.setItem('project settings', JSON.stringify(projectSettings));
	}

	async saveJsonPath(pathName, path) {}

	async saveCSVPath(path, pathName, csvFolder) {}

	async deletePath(pathName, csvFolder) {}

	async renameJsonPath(oldName, newName) {}
}
