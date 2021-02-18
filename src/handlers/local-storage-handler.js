import { setRobotDrawConfig, setFieldConfig, setImage } from '../redux/project/actions';
import { FieldConfig, RobotDrawConfig } from '../component/field-view/view-config';
import { setPathConfig, addPath } from '../redux/path/actions';
import { getCoordsCSV, getSetpointsCSV } from './csv-handler';
import { Swerve, Tank } from 'path-generator';
import * as JSZip from 'jszip';

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

	async loadRobotDrawConfig() {
		let robotDrawConfig = new RobotDrawConfig();
		if (this.jsonProject && this.jsonProject.robotDrawConfig)
			robotDrawConfig = Object.assign(new RobotDrawConfig(), this.jsonProject.robotDrawConfig);
		this.dispatch(setRobotDrawConfig(robotDrawConfig));
	}

	async loadFieldConfig() {
		let fieldConfig = new FieldConfig();
		if (this.jsonProject && this.jsonProject.fieldConfig)
			fieldConfig = Object.assign(new FieldConfig(), this.jsonProject.fieldConfig);
		this.dispatch(setFieldConfig(fieldConfig));
	}

	async loadFieldImage(image) {
		try {
			image = image ? image : this.jsonProject.image;
			this.dispatch(setImage(image, image));
		} catch (error) {
			this.dispatch(setImage('', ''));
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
		const data = { ...path };
		localStorage.setItem(`path/${pathName}`, JSON.stringify(data));
	}

	async saveCSVPath(path, pathName) {
		try {
			let zip = new JSZip();
			let folder = zip.folder(pathName);
			Object.keys(path).forEach((key) => {
				if (!key.endsWith('Setpoints')) return;
				const fileName = `${pathName}.${key.replace('_', '').replace('Setpoints', '')}.csv`;
				folder.file(fileName, getSetpointsCSV(path[key]));
			});
			folder.file(`${pathName}.coords.csv`, getCoordsCSV(path));
			const blob = await zip.generateAsync({ type: 'blob' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.download = `${pathName}.zip`;
			link.href = url;
			link.click();
		} catch (error) {}
	}

	async deletePath(pathName) {
		localStorage.removeItem(`path/${pathName}`);
	}

	async renameJsonPath(oldName, newName) {
		const path = localStorage.getItem(`path/${oldName}`);
		localStorage.setItem(`path/${newName}`, path);
		localStorage.removeItem(`path/${oldName}`);
	}
}
