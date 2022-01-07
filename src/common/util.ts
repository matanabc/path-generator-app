import { useFieldStore } from '../store';
import { BORDER_SIZE } from './consts';

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
