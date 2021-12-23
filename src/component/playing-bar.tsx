import Coord from 'path-generator/lib/motionProfiling/coord';
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';

import { useFieldStore, useRobotStore } from '../store';
import { TPlayingBarProps } from './simulation/types';
import { materToPixel } from '../util';
import Robot from './simulation/robot';
import { Row } from './common';

export default function PlayingBar({ coords }: TPlayingBarProps) {
	const [rangePosition, setRangePosition] = useState(0);
	const { robotLoopTime } = useRobotStore().pathConfig;
	const { topLeftX, topLeftY } = useFieldStore();

	const maxRange = Math.max(coords.length - 1, 0);
	const coord = coords[rangePosition] || new Coord(0, 0, 0);
	const { x, y } = materToPixel(coord.x, coord.y);
	const position = { angle: coord.angle, x: x + topLeftX, y: y + topLeftY };

	const onWheel = (e: React.WheelEvent) => setRangePosition(Number((rangePosition + e.deltaY).toFixed(0)));

	if (maxRange < rangePosition) setRangePosition(maxRange);
	else if (0 > rangePosition) setRangePosition(0);

	return (
		<>
			{rangePosition > 0 && <Robot position={position} />}
			<Container>
				<Row gap={4}>
					<span id='Time'>{(rangePosition * robotLoopTime).toFixed(2)}</span>
					<Form.Control
						type='range'
						max={maxRange}
						onWheel={onWheel}
						value={rangePosition}
						disabled={coords.length === 0}
						onChange={({ target }) => setRangePosition(Number(target.value))}
					/>
					<span id='Time'>{(maxRange * robotLoopTime).toFixed(2)}</span>
				</Row>
			</Container>
		</>
	);
}
