import Coord from 'path-generator/lib/motionProfiling/coord';

import { materToPixel } from './util';

export const drawCoords = ({ width, height }: HTMLCanvasElement, ctx: CanvasRenderingContext2D, coords: Coord[]) => {
	ctx.clearRect(0, 0, width, height);
	ctx.lineWidth = 5;
	ctx.beginPath();
	coords.forEach((setpoint, index) => {
		const { x, y } = materToPixel(setpoint.x, setpoint.y);
		index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
	});
	ctx.strokeStyle = 'Yellow';
	ctx.stroke();
};
