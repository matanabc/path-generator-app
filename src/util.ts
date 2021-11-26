import { Holonomic, PathConfig, Tank, Waypoint } from 'path-generator';
import { DriveTypeOption } from './consts';
import { useFieldStore } from './store';

const createTankPath = (pathConfig: PathConfig) => {
	const waypoints = [new Waypoint(1, 1, 0, 0, 1), new Waypoint(2.5, 2.5, 90, 1, 1), new Waypoint(4, 4, 0, 0, 0)];
	return new Tank.Path(waypoints, pathConfig);
};

const createHolonomicPath = (pathConfig: PathConfig) => {
	const waypoints = [
		new Holonomic.Waypoint(1, 1, 0, 0, 1),
		new Holonomic.Waypoint(2.5, 2.5, 90, 1, 1),
		new Holonomic.Waypoint(4, 4, 0, 0, 0),
	];
	return new Holonomic.Path(waypoints, pathConfig);
};

export const createPathSelector = (state: any) => {
	const pathConfig = new PathConfig(state.vMax, state.acc, state.width, state.length, state.robotLoopTime);
	return DriveTypeOption.Holonomic === state.driveType ? createHolonomicPath(pathConfig) : createTankPath(pathConfig);
};

export const materToPixel = (x: number, y: number) => {
	const { widthInMeter, widthInPixel, heightInMeter, heightInPixel } = useFieldStore.getState();
	return { x: x / (widthInMeter / widthInPixel), y: y / (heightInMeter / heightInPixel) };
};

export const pixelToMater = (x: number, y: number) => {
	const { widthInMeter, widthInPixel, heightInMeter, heightInPixel } = useFieldStore.getState();
	return { x: x * (widthInMeter / widthInPixel), y: y * (heightInMeter / heightInPixel) };
};
