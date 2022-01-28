import Coord from 'path-generator/lib/motionProfiling/coord';
import { Container, Form } from 'react-bootstrap';
import { fixNumber } from '../../common/util';
import { useRobotStore } from '../../store';
import { Row } from '../common';
import './slider.css';

type TProps = { coords: Coord[] };

export default function Slider({ coords }: TProps) {
	const { robotPosition, pathConfig, setRobotPosition } = useRobotStore();

	const max = coords.length - 1;
	const { robotLoopTime } = pathConfig;
	const position = fixNumber(0, robotPosition, max);
	const time = (position * robotLoopTime).toFixed(2);
	const totalTime = (max * robotLoopTime).toFixed(2);
	const onChange = ({ target }: any) => setRobotPosition(Number(target.value));

	return (
		<Container>
			<Row>
				<span>{time}</span>
				<Form.Control type='range' min={0} value={position} max={max} onChange={onChange} />
				<span>{totalTime}</span>
			</Row>
		</Container>
	);
}
