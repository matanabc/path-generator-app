import Coord from 'path-generator/lib/motionProfiling/coord';

import { BORDER_SIZE, WAYPOINT_SIZE } from './consts';
import { materToPixel } from './util';

const offset = WAYPOINT_SIZE / 2 - BORDER_SIZE;

export const drawCoords = ({ width, height }: HTMLCanvasElement, ctx: CanvasRenderingContext2D, coords: Coord[]) => {
	ctx.clearRect(0, 0, width, height);
	ctx.lineWidth = 5;
	ctx.beginPath();
	coords.forEach((setpoint, index) => {
		const { x, y } = materToPixel(setpoint.x, setpoint.y);
		index === 0 ? ctx.moveTo(x + offset, y + offset) : ctx.lineTo(x + offset, y + offset);
	});
	ctx.strokeStyle = 'Yellow';
	ctx.stroke();
};
