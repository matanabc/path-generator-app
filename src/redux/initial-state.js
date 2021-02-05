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
	path: undefined,

	// PathsGroup
	pathsGroups: {
		Test10: ['RIGHT_TO_DJ', 'RIGHT_DJ_TO_SHOT', 'RIGHT_SHOT_TO_BALLS', 'RIGHT_BALLS1', 'RIGHT_BALLS2'],
	},

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
	isWeb: true,
};
