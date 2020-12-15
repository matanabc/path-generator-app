export default class FileHandler {
	constructor() {
		this.ipcRenderer = window.require('electron').ipcRenderer;
		this.fs = window.require('fs');
		this.setOnFinish();
	}

	setOnFinish(loadFieldConfig, loadFieldImage, loadPathConfig, loadPaths) {
		const defaultFinish = () => {};
		this.loadFieldConfigFinish = loadFieldConfig ? loadFieldConfig : defaultFinish;
		this.loadFieldImageFinish = loadFieldImage ? loadFieldImage : defaultFinish;
		this.loadPathConfigFinish = loadPathConfig ? loadPathConfig : defaultFinish;
		this.loadPathsFinish = loadPaths ? loadPaths : defaultFinish;
	}

	load() {
		this.loadFieldConfig();
		this.loadFieldImage();
		this.loadPathConfig();
		this.loadPaths();
	}

	async changeProjectFolderPath(folderPath) {
		this.ipcRenderer.invoke('UpdateProjctPath', folderPath);
	}

	async getProjectFolderPath() {
		return await this.ipcRenderer.invoke('GetProjctPath');
	}

	async loadFieldConfig() {}

	async loadFieldImage() {}

	async loadPathConfig() {}

	async loadPaths() {}

	async saveJsonProject() {}

	async saveJsonPath() {}

	async saveCSVPath() {}

	async deletePath() {}

	async renamePath() {}
}
