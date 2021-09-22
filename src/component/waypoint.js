import { FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import { setWaypoint, removeWaypoint } from '../redux/path/actions';
import { Holonomic } from 'path-generator';
import { MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import React from 'react';

class Waypoint extends React.Component {
	onChange = (value) => this.props.setWaypoint({ ...this.props.waypoint, ...value }, this.props.index);
	onRemove = () => {
		this.props.removeWaypoint(this.props.index);
		this.props.close();
	};

	render() {
		const { waypoint, show, index, close, length, driveType } = this.props;
		if (!waypoint) return <></>;

		return (
			<Modal show={show} onHide={close} size={'xl'}>
				<Modal.Header closeButton>
					<Modal.Title>Waypoint {index + 1} info</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ display: 'flex', textAlignLast: 'center' }}>
					<InputGroup.Prepend>
						<InputGroup.Text>X</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						defaultValue={waypoint.x}
						onChange={(e) => this.onChange({ x: Number(e.target.value) })}
					/>

					<InputGroup.Prepend>
						<InputGroup.Text>Y</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						defaultValue={waypoint.y}
						onChange={(e) => this.onChange({ y: Number(e.target.value) })}
					/>

					<InputGroup.Prepend>
						<InputGroup.Text>Angle</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						defaultValue={waypoint.angle}
						onChange={(e) => this.onChange({ angle: Number(e.target.value) })}
					/>

					{driveType === Holonomic && (
						<>
							<InputGroup.Prepend>
								<InputGroup.Text>Robot Angle</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								className="mr-2"
								defaultValue={this.props.waypoint.robotAngle}
								onChange={(e) => this.onChange({ robotAngle: Number(e.target.value) })}
							/>
						</>
					)}

					<InputGroup.Prepend>
						<InputGroup.Text>V</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						defaultValue={waypoint.v}
						onChange={(e) => this.onChange({ v: Number(e.target.value) })}
					/>

					<InputGroup.Prepend>
						<InputGroup.Text>vMax</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						defaultValue={waypoint.vMax}
						onChange={(e) => this.onChange({ vMax: Number(e.target.value) })}
					/>

					<Button className="mr-2" variant="danger" onClick={this.onRemove} disabled={length <= 2}>
						<MdDelete />
					</Button>
				</Modal.Body>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		driveType: state.driveType,
		length: state.selected ? state.paths[state.selected].waypoints.length : 0,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setWaypoint: (waypoint, index) => dispatch(setWaypoint(waypoint, index)),
		removeWaypoint: (index) => dispatch(removeWaypoint(index)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Waypoint);
