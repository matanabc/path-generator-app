import { setProjectPath, setFieldConfig, setImage } from '../redux/project/actions';
import { FieldConfig } from '../component/field-view/view-config';
import { setPathConfig, addPath } from '../redux/path/actions';

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
				this.dispatch(setImage(this.jsonProject.image, this.jsonProject.image));
				return;
			}

			var imagePath = '';
			if (this.jsonProject.image.indexOf('/') === -1)
				imagePath = `${this.projectPath}/${this.jsonProject.image}`;
			else imagePath = this.jsonProject.image;

			const data = this.fs.readFileSync(imagePath);
			const imageUrl = URL.createObjectURL(new Blob([data]));
			this.dispatch(setImage(imageUrl, this.jsonProject.image));
		} catch (error) {
			this.dispatch(setImage('', ''));
		}
	}

	async loadPathConfig() {
		if (this.jsonProject) this.dispatch(setPathConfig(this.jsonProject.pathConfig));
	}

	async loadPaths() {
		try {
			const files = this.fs.readdirSync(`${this.projectPath}/paths`);
			files.forEach(async (fileName) => {
				if (fileName.endsWith('.json')) this.loadPath(fileName);
			});
		} catch (error) {}
	}

	async loadPath(fileName) {
		try {
			const data = this.fs.readFileSync(`${this.projectPath}/paths/${fileName}`);
			this.dispatch(addPath(fileName.replace('.json', ''), JSON.parse(data).waypoints));
		} catch (error) {}
	}

	async saveJsonProject() {}

	async saveJsonPath(pathName, path) {
		try {
			if (!this.fs.existsSync(`${this.projectPath}/paths`))
				this.fs.mkdirSync(`${this.projectPath}/paths`);
			const data = JSON.stringify({ isInReverse: false, waypoints: path.waypoints });
			this.fs.writeFileSync(`${this.projectPath}/paths/${pathName}.json`, data);
		} catch (error) {}
	}

	async saveCSVPath() {}

	async deleteJsonPath(pathName) {
		try {
			this.fs.unlinkSync(`${this.projectPath}/paths/${pathName}.json`);
		} catch (error) {}
	}

	async renameJsonPath(oldName, newName) {
		try {
			this.fs.renameSync(
				`${this.projectPath}/paths/${oldName}.json`,
				`${this.projectPath}/paths/${newName}.json`
			);
		} catch (error) {}
	}
}
