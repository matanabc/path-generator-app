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

	loadJsonProject() {}

	async loadRobotDrawConfig() {}

	async loadFieldConfig() {}

	async loadFieldImage(image) {}

	async loadPathConfig() {}

	async loadPaths() {}

	async loadPath(fileName) {}

	async saveJsonProject(settings) {}

	async saveJsonPath(pathName, path) {}

	async saveCSVPath(path, pathName, csvFolder) {}

	async deletePath(pathName, csvFolder) {}

	async renameJsonPath(oldName, newName) {}
}
