import { Holonomic, Tank } from 'path-generator';

import { DriveTypeOption, BORDER_SIZE } from './consts';
import { useFieldStore } from './store';

export const createPathSelector = (state: any) => {
	const waypoints = state.paths[state.selected] || [];
	if (DriveTypeOption.Holonomic === state.driveType) return new Holonomic.Path(waypoints, state.pathConfig);
	return new Tank.Path(waypoints, state.pathConfig);
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
		x: x * (widthInMeter / (widthInPixel - BORDER_SIZE)),
		y: y * (heightInMeter / (heightInPixel - BORDER_SIZE)),
	};
};
