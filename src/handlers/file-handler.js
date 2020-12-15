import { setProjectPath, setFieldConfig, setImage } from '../redux/project/actions';
import { FieldConfig } from '../component/field-view/view-config';

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
			this.jsonProject = undefined;
		}
	}

	async loadFieldConfig() {
		var fieldConfig = new FieldConfig();
		if (this.jsonProject)
			fieldConfig = Object.assign(new FieldConfig(), this.jsonProject.fieldConfig);
		this.dispatch(setFieldConfig(fieldConfig));
	}

	async loadFieldImage() {
		try {
			if (!this.jsonProject) return;
			if (this.jsonProject.image.startsWith('http')) {
				this.dispatch(setImage(this.jsonProject.image));
				return;
			}

			var imagePath = '';
			if (this.jsonProject.image.indexOf('/') === -1)
				imagePath = `${this.projectPath}/${this.jsonProject.image}`;
			else imagePath = this.jsonProject.image;

			const data = this.fs.readFileSync(imagePath);
			const imageUrl = URL.createObjectURL(new Blob([data]));
			this.dispatch(setImage(imageUrl));
		} catch (error) {
			this.dispatch(setImage(''));
		}
	}

	async loadPathConfig() {}

	async loadPaths() {}

	async saveJsonProject() {}

	async saveJsonPath() {}

	async saveCSVPath() {}

	async deletePath() {}

	async renamePath() {}
}
