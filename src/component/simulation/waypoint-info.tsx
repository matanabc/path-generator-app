import HolonomicWaypoint from 'path-generator/lib/waypoints/holonomic-waypoint';
import { Modal } from 'react-bootstrap';

import { Input, Row } from '../common';
import { TWaypointInfoProps } from './types';

export default function WaypointInfo({ show, index, waypoint, onClose, setWaypoint }: TWaypointInfoProps) {
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
						value={x}
						type='number'
						onChange={({ target }) => setWaypoint(index, { x: Number(target.value) })}
					/>
					<Input
						title='Y'
						value={y}
						type='number'
						onChange={({ target }) => setWaypoint(index, { y: Number(target.value) })}
					/>
				</Row>

				<Row className='mb-4' gap={4}>
					<Input
						title='V'
						value={v}
						type='number'
						onChange={({ target }) => setWaypoint(index, { v: Number(target.value) })}
					/>
					<Input
						value={vMax}
						type='number'
						title='V Max'
						onChange={({ target }) => setWaypoint(index, { vMax: Number(target.value) })}
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
