import { useEffect, useRef } from 'react';

import { fixNumber, materToPixel } from '../../common/util';
import { WAYPOINT_SIZE } from '../../common/consts';
import { useRobotStore } from '../../store';
import { TRobotProps } from './types';

const offset = WAYPOINT_SIZE / 2;

const drawRobotCenter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, center: number, length: number) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc((canvas.width / 2) * (1 - (center / length) * 2), canvas.height / 2, 10, 0, 2 * Math.PI);
	ctx.fillStyle = 'blue';
	ctx.fill();
};

const getPosition = (point: any, topLeftX: number, topLeftY: number, robotSize: any) => {
	const { x, y } = materToPixel(point.x, point.y);
	return {
		x: x + topLeftX - robotSize.x / 2 + offset,
		y: y + topLeftY - robotSize.y / 2 + offset,
	};
};

const getStyle = (x: number, y: number, angle: number, drawConfig: any) => {
	const position = `translate(${x}px, ${y}px)`;
	const rotate = `rotate(${angle}deg)`;
	const center = `translate(${(drawConfig.center / drawConfig.length) * 100}%, 0%)`;
	return { transform: `${position} ${rotate} ${center}` };
};

export default function Robot({ coords, waypoints, topLeftX, topLeftY, robotPosition, setRobotPosition }: TRobotProps) {
	const ref = useRef<HTMLCanvasElement>(null);
	const drawConfig = useRobotStore((state) => state.drawConfig);
	const robotSize = materToPixel(drawConfig.length, drawConfig.width);

	useEffect(() => {
		const canvas = ref.current;
		if (canvas === null) return;
		const ctx = canvas.getContext('2d');
		if (ctx === null) return;
		drawRobotCenter(canvas, ctx, drawConfig.center, drawConfig.length);
	});

	document.onwheel = (e: WheelEvent) => {
		if (robotPosition < 0 || coords.length === 0) return;
		setRobotPosition(fixNumber(0, robotPosition + Math.sign(e.deltaY), coords.length - 1));
	};

	let point;
	if (robotPosition < 0) point = waypoints[-1 - robotPosition];
	else if (robotPosition > 0) point = coords[robotPosition];
	else return <></>;

	const { x, y } = getPosition(point, topLeftX, topLeftY, robotSize);
	return (
		<>
			<canvas
				id='Robot'
				ref={ref}
				width={robotSize.x}
				height={robotSize.y}
				style={getStyle(x, y, point.angle, drawConfig)}
			/>
		</>
	);
}
