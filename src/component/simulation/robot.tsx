import { Rnd } from 'react-rnd';

import { TRobotProps } from './types';

export default function Robot({ position }: TRobotProps) {
	const { x, y, angle } = position;
	const width = 50;
	const height = 50;
	const robotPosition = { x: x - (width - 5) / 4, y: y - (height - 5) / 4 };

	return (
		<>
			<Rnd position={robotPosition} enableResizing={false} disableDragging>
				<canvas id='Robot' style={{ width, height, transform: `rotate(${angle}deg)` }} />
			</Rnd>
		</>
	);
}
