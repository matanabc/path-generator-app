import Coord from 'path-generator/lib/motionProfiling/coord';
import { Container, Form } from 'react-bootstrap';

import { usePathConfig, useRobotPosition } from '../../store/use';
import { fixNumber } from '../../common/util';
import { Row } from '../common';
import './slider.css';

type TProps = { coords: Coord[] };

export default function Slider({ coords }: TProps) {
	const { robotLoopTime } = usePathConfig().pathConfig;
	const { robotPosition, setRobotPosition } = useRobotPosition();

	const max = fixNumber(0, coords.length - 1, coords.length);
	const position = fixNumber(0, robotPosition, max);
	const time = (position * robotLoopTime).toFixed(2);
	const totalTime = (max * robotLoopTime).toFixed(2);
	const onChange = ({ target }: any) => setRobotPosition(Number(target.value));

	return (
		<Container>
			<Row>
				<span id='Time'>{time}</span>
				<Form.Control
					min={0}
					max={max}
					type='range'
					value={position}
					onChange={onChange}
					disabled={max === 0}
				/>
				<span id='Time'>{totalTime}</span>
			</Row>
		</Container>
	);
}
