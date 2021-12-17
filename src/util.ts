import { Holonomic, Tank } from 'path-generator';

import { DriveTypeOption, BORDER_SIZE } from './consts';
import { useFieldStore } from './store';

export const createPath = ({ paths, selected = '' }: any, { pathConfig, driveType }: any) => {
	const waypoints = paths[selected] || [];
	if (waypoints.length === 0) return { coords: [] };
	if (DriveTypeOption.Holonomic === driveType) return new Holonomic.Path(waypoints, pathConfig);
	return new Tank.Path(waypoints, pathConfig);
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
