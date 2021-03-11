import { setRobotDrawConfig, setProjectPath, setFieldConfig, setCSVPath, setImage } from '../redux/project/actions';
import { FieldConfig, RobotDrawConfig } from '../component/field-view/view-config';
import { setPathConfig, addPath } from '../redux/path/actions';
import { getCoordsCSV, getSetpointsCSV } from './csv-handler';
import { Swerve, Tank } from 'path-generator';

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
		this.setCSVFolderPath();
		this.loadRobotDrawConfig();
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

	async setCSVFolderPath() {
		if (this.jsonProject && this.jsonProject.saveCSVTo && this.jsonProject.saveCSVTo !== '')
			this.dispatch(setCSVPath(this.jsonProject.saveCSVTo));
		else this.dispatch(setCSVPath(`${this.projectPath}/csv`));
	}

	loadJsonProject() {
		try {
			const data = this.fs.readFileSync(`${this.projectPath}/PathGenerator.json`);
			this.jsonProject = JSON.parse(data);
		} catch (error) {
			this.jsonProject = undefined;
		}
	}

	async loadRobotDrawConfig() {
		var robotDrawConfig = new RobotDrawConfig();
		if (this.jsonProject && this.jsonProject.robotDrawConfig)
			robotDrawConfig = Object.assign(new RobotDrawConfig(), this.jsonProject.robotDrawConfig);
		this.dispatch(setRobotDrawConfig(robotDrawConfig));
	}

	async loadFieldConfig() {
		var fieldConfig = new FieldConfig();
		if (this.jsonProject && this.jsonProject.fieldConfig)
			fieldConfig = Object.assign(new FieldConfig(), this.jsonProject.fieldConfig);
		this.dispatch(setFieldConfig(fieldConfig));
	}

	async loadFieldImage(image) {
		try {
			image = image ? image : this.jsonProject.image;
			if (image.startsWith('http')) {
				this.dispatch(setImage(image, image));
				return;
			}

			var imagePath = '';
			if (image.indexOf('/') === -1) imagePath = `${this.projectPath}/${image}`;
			else imagePath = image;

			const data = this.fs.readFileSync(imagePath);
			const imageUrl = URL.createObjectURL(new Blob([data]));
			this.dispatch(setImage(imageUrl, image));
		} catch (error) {
			this.dispatch(setImage('', image || ''));
		}
	}

	async loadPathConfig() {
		try {
			this.jsonProject.driveType = this.jsonProject.driveType ? this.jsonProject.driveType : 'tank';
			const driveType = this.jsonProject.driveType === 'swerve' ? Swerve : Tank;
			const pathConfig = this.jsonProject.pathConfig ? this.jsonProject.pathConfig : {};
			this.dispatch(setPathConfig(pathConfig, driveType));
		} catch (error) {
			this.dispatch(setPathConfig(new Tank.PathConfig(), Tank));
		}
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
			const path = JSON.parse(data);
			this.dispatch(addPath(fileName.replace('.json', ''), path.waypoints, path.isInReverse));
		} catch (error) {}
	}

	async saveJsonProject(settings) {
		try {
			const projectSettings = { ...settings };
			projectSettings.driveType = settings.driveType === Swerve ? 'swerve' : 'tank';
			delete projectSettings.projectPath;
			const jsonProject = JSON.stringify(projectSettings);
			if (!this.fs.existsSync(this.projectPath)) this.fs.mkdirSync(this.projectPath);
			this.fs.writeFileSync(`${this.projectPath}/PathGenerator.json`, jsonProject);
		} catch (error) {}
	}

	async saveJsonPath(pathName, path) {
		try {
			if (!this.fs.existsSync(`${this.projectPath}/paths`)) this.fs.mkdirSync(`${this.projectPath}/paths`);
			const data = JSON.stringify({ ...path });
			this.fs.writeFileSync(`${this.projectPath}/paths/${pathName}.json`, data);
		} catch (error) {}
	}

	async saveJsonGroup(groupName, paths) {
		try {
			if (!this.fs.existsSync(`${this.projectPath}/groups`)) this.fs.mkdirSync(`${this.projectPath}/groups`);
			const data = JSON.stringify(paths);
			this.fs.writeFileSync(`${this.projectPath}/groups/${groupName}.json`, data);
		} catch (error) {}
	}

	async saveCSVPath(path, pathName, csvFolder) {
		try {
			if (!this.fs.existsSync(csvFolder)) this.fs.mkdirSync(csvFolder);
			if (this.fs.existsSync(`${csvFolder}/${pathName}`))
				this.fs.rmdirSync(`${csvFolder}/${pathName}`, { recursive: true });
			this.fs.mkdirSync(`${csvFolder}/${pathName}`);

			const keys = Object.keys(path).filter((key) => key.endsWith('Setpoints'));
			keys.forEach((key) => {
				const fileName = `${pathName}.${key.replace('_', '').replace('Setpoints', '')}.csv`;
				this.fs.writeFileSync(`${csvFolder}/${pathName}/${fileName}`, getSetpointsCSV(path[key]));
			});
			this.fs.writeFileSync(`${csvFolder}/${pathName}/${pathName}.coords.csv`, getCoordsCSV(path));
		} catch (error) {}
	}

	async deletePath(pathName, csvFolder) {
		try {
			this.fs.unlinkSync(`${this.projectPath}/paths/${pathName}.json`);
			this.fs.rmdirSync(`${csvFolder}/${pathName}`, { recursive: true });
		} catch (error) {}
	}

	async deleteGroup(groupName) {
		try {
			this.fs.unlinkSync(`${this.projectPath}/groups/${groupName}.json`);
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
