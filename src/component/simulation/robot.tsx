import { Rnd } from 'react-rnd';
import { BORDER_SIZE } from '../../consts';

import { TRobotProps } from './types';

const offset = BORDER_SIZE * 2;

export default function Robot({ position }: TRobotProps) {
	const { x, y, angle } = position;
	const width = 50;
	const height = 50;
	const robotPosition = { x: x - (width - offset) / 4, y: y - (height - offset) / 4 };

	return (
		<>
			<Rnd position={robotPosition} enableResizing={false} disableDragging>
				<canvas id='Robot' style={{ width, height, transform: `rotate(${angle}deg)` }} />
			</Rnd>
		</>
	);
}
