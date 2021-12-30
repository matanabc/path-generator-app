import { Holonomic, PathConfig, Tank } from 'path-generator';

import { DriveTypeOption } from './enums';
import { useFieldStore } from '../store';
import { BORDER_SIZE } from './consts';

export const createPath = ({ paths, selected = '' }: any, { pathConfig, driveType }: any) => {
	const { vMax, acc, width, length, robotLoopTime } = pathConfig;
	const _pathConfig = new PathConfig(vMax, acc, width, length, robotLoopTime);
	const waypoints = paths[selected] || [];
	if (waypoints.length === 0) return { coords: [] };
	if (DriveTypeOption.Holonomic === driveType) return new Holonomic.Path(waypoints, _pathConfig);
	return new Tank.Path(waypoints, _pathConfig);
};

export const materToPixel = (x: number, y: number) => {
	const { widthInMeter, widthInPixel, heightInMeter, heightInPixel } = useFieldStore.getState();
	return {
		x: x / (widthInMeter / (widthInPixel - BORDER_SIZE)),
		y: y / (heightInMeter / (heightInPixel - BORDER_SIZE)),
	};
};

export const pixelToMater = (x: number, y: number) => {
	const { widthInMeter, widthInPixel, heightInMeter, heightInPixel } = useFieldStore.getState();
	return {
		x: Number((x * (widthInMeter / (widthInPixel - BORDER_SIZE))).toFixed(3)),
		y: Number((y * (heightInMeter / (heightInPixel - BORDER_SIZE))).toFixed(3)),
	};
};
