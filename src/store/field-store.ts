import create from 'zustand';
import { combine } from 'zustand/middleware';

export const initialFieldState = {
	image: '',
	topLeftX: 0,
	topLeftY: 0,
	widthInMeter: 0,
	heightInMeter: 0,
	widthInPixel: 100,
	heightInPixel: 100,
};

export default create(
	combine(initialFieldState, (set) => ({
		setField: (value: any) => set({ ...value }),
		updateFiledInPixel: (heightInPixel: number, widthInPixel: number, topLeftX: number, topLeftY: number) =>
			set({ heightInPixel, widthInPixel, topLeftX, topLeftY }),
	}))
);
