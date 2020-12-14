import { FieldConfig, RobotDrawConfig } from '../component/field-view/view-config';
import { PopupsConfig } from '../component/popups/popups-config';

import { Tank } from 'path-generator';
const { Path, PathConfig, Waypoint } = Tank;

const waypoints = [
	new Waypoint(0, 0, 0, 0, 2),
	new Waypoint(1.5, 1.5, 90, 2, 2),
	new Waypoint(3, 3, 0, 0, 0),
];
const pathConfig = new PathConfig(0.8, 3.5, 3);

export const initialState = {
	//View state
	fieldConfig: new FieldConfig(16.5354, 8.001, 50, 25, 198, 103),
	robotDrawConfig: new RobotDrawConfig(),
	popupsStatus: new PopupsConfig(),
	drawRobotInterval: undefined,
	rangePosition: 0,
	imageUrl:
		'https://www.chiefdelphi.com/uploads/default/optimized/3X/4/4/44492d390e1f186bef450b307b132e820fd88263_2_690x388.png',

	// Path state
	selectedPath: undefined,
	pathConfig: pathConfig,
	pathType: Tank,
	paths: {
		test: new Path(waypoints, pathConfig),
	},
};
