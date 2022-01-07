import { Rnd } from 'react-rnd';

import { useFieldStore, useRobotStore } from '../../store';
import { BORDER_SIZE } from '../../common/consts';
import { materToPixel } from '../../common/util';

const offset = BORDER_SIZE * 2;

export default function Robot() {
	const { robotPosition } = useRobotStore();
	const { topLeftX, topLeftY } = useFieldStore();
	if (!robotPosition || JSON.stringify(robotPosition) === JSON.stringify({})) return <></>;

	const { x, y } = materToPixel(robotPosition.x, robotPosition.y);
	const width = 50;
	const height = 50;
	const position = {
		x: x + topLeftX - (width - offset) / 4,
		y: y + topLeftY - (height - offset) / 4,
	};

	return (
		<>
			<Rnd position={position} enableResizing={false} disableDragging>
				<canvas id='Robot' style={{ width, height, transform: `rotate(${robotPosition.angle}deg)` }} />
			</Rnd>
		</>
	);
}
