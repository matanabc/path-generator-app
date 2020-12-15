import { setProjectPath } from '../redux/project/actions';

export default class FileHandler {
	constructor(callback) {
		this.ipcRenderer = window.require('electron').ipcRenderer;
		this.fs = window.require('fs');
		this.dispatch = callback;
		this.projectPath = '';
		this.load();
	}

	async load() {
		await this.setProjectFolderPath();
		this.loadJsonProject();
		this.loadFieldConfig();
		this.loadFieldImage();
		this.loadPathConfig();
		this.loadPaths();
	}

	async changeProjectFolderPath(folderPath) {
		await this.ipcRenderer.invoke('UpdateProjctPath', folderPath);
		this.load();
	}

	async setProjectFolderPath() {
		this.projectPath = await this.ipcRenderer.invoke('GetProjctPath');
		this.dispatch(setProjectPath(this.projectPath));
	}

	loadJsonProject() {
		try {
			const data = this.fs.readFileSync(`${this.projectPath}/PathGenerator.json`);
			this.jsonProject = JSON.parse(data);
		} catch (error) {
			this.jsonProject = {};
		}
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
