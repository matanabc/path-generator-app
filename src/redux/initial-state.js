import { FieldConfig, RobotDrawConfig } from '../component/field-view/view-config';
import { PopupsConfig } from '../component/popups/popups-config';
import { Tank } from 'path-generator';

export const initialState = {
	//View
	popupsStatus: new PopupsConfig(),
	addWaypointInIndex: undefined,
	drawRobotInterval: undefined,
	listenToMouseClicks: false,
	selected: undefined,
	rangePosition: 0,
	isPathMode: true,

	// group
	groups: {
		Test10: [
			'START_TO_ROCKET_A',
			'START_TO_ROCKET_B',
			'ROCKET_TO_PLAYER_A',
			'ROCKET_TO_PLAYER_B',
			'PLAYER_TO_ROCKET_A',
			'PLAYER_TO_ROCKET_B',
		],
	},

	// Path
	driveType: Tank,
	path: undefined,
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
	isWeb: true,
};
