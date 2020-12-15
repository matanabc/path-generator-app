import { FieldConfig, RobotDrawConfig } from '../component/field-view/view-config';
import { PopupsConfig } from '../component/popups/popups-config';
import { Tank } from 'path-generator';

export const initialState = {
	//View
	popupsStatus: new PopupsConfig(),
	addWaypointInIndex: undefined,
	drawRobotInterval: undefined,
	listenToMouseClicks: false,
	selectedPath: undefined,
	rangePosition: 0,
	isWeb: true,

	// Path
	driveType: Tank,
	paths: {},

	//Project
	robotDrawConfig: new RobotDrawConfig(),
	pathConfig: new Tank.PathConfig(),
	fieldConfig: new FieldConfig(),
	projectPath: '',
	saveCSVTo: '',
	imageUrl: '',
	image: '',

	//App
	newVersion: undefined,
	version: '0.0.0',
};
