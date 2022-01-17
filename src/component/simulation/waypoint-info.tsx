import HolonomicWaypoint from 'path-generator/lib/waypoints/holonomic-waypoint';
import { Modal } from 'react-bootstrap';

import { fixNumber } from '../../common/util';
import { TWaypointInfoProps } from './types';
import { Input, Row } from '../common';

export default function WaypointInfo({
	show,
	index,
	waypoint,
	robotVMax,
	widthInMeter,
	heightInMeter,
	onClose,
	setWaypoint,
}: TWaypointInfoProps) {
	const { x, y, v, vMax, angle } = waypoint;

	return (
		<Modal centered scrollable show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{`Waypoint ${index + 1} Info`}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className='mb-4' gap={4}>
					<Input
						title='X'
						value={fixNumber(0, x, widthInMeter)}
						type='number'
						onChange={({ target }) =>
							setWaypoint(index, { x: fixNumber(0, Number(target.value), widthInMeter) })
						}
					/>
					<Input
						title='Y'
						value={fixNumber(0, y, heightInMeter)}
						type='number'
						onChange={({ target }) =>
							setWaypoint(index, { y: fixNumber(0, Number(target.value), heightInMeter) })
						}
					/>
				</Row>

				<Row className='mb-4' gap={4}>
					<Input
						title='V'
						value={fixNumber(0, v, robotVMax)}
						type='number'
						onChange={({ target }) =>
							setWaypoint(index, { v: fixNumber(0, Number(target.value), robotVMax) })
						}
					/>
					<Input
						value={fixNumber(0, vMax, robotVMax)}
						type='number'
						title='V Max'
						onChange={({ target }) =>
							setWaypoint(index, { vMax: fixNumber(0, Number(target.value), robotVMax) })
						}
					/>
				</Row>

				<Row className='mb-4' gap={4}>
					<Input
						type='number'
						title='Angle'
						value={angle}
						onChange={({ target }) => setWaypoint(index, { angle: Number(target.value) })}
					/>
					{waypoint instanceof HolonomicWaypoint && (
						<Input
							type='number'
							title='Robot Angle'
							value={waypoint.robotAngle}
							onChange={({ target }) => setWaypoint(index, { robotAngle: Number(target.value) })}
						/>
					)}
				</Row>
			</Modal.Body>
		</Modal>
	);
}
