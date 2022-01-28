import { Rnd } from 'react-rnd';

import { fixNumber, materToPixel } from '../../common/util';
import { BORDER_SIZE } from '../../common/consts';
import { TRobotProps } from './types';

const offset = BORDER_SIZE * 2;

export default function Robot({ coords, waypoints, topLeftX, topLeftY, robotPosition, setRobotPosition }: TRobotProps) {
	document.onwheel = (e: WheelEvent) => {
		if (robotPosition < 0 || coords.length === 0) return;
		setRobotPosition(fixNumber(0, robotPosition + Math.sign(e.deltaY), coords.length - 1));
	};

	let point;
	if (robotPosition < 0) point = waypoints[-1 - robotPosition];
	else if (robotPosition > 0) point = coords[robotPosition];
	else return <></>;

	const { x, y } = materToPixel(point.x, point.y);
	const width = 50;
	const height = 50;
	const position = {
		x: x + topLeftX - (width - offset) / 4,
		y: y + topLeftY - (height - offset) / 4,
	};

	return (
		<>
			<Rnd position={position} enableResizing={false} disableDragging>
				<canvas id='Robot' style={{ width, height, transform: `rotate(${point.angle}deg)` }} />
			</Rnd>
		</>
	);
}
