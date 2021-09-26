import { FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import { setWaypoint, removeWaypoint } from '../redux/path/actions';
import { Holonomic } from 'path-generator';
import { MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import React from 'react';

class Waypoint extends React.Component {
	onChange = (value) => this.props.setWaypoint({ ...this.props.waypoint, ...value }, this.props);
	onRemove = () => {
		this.props.removeWaypoint(this.props);
		this.props.close();
	};

	render() {
		const { waypoint, show, close, length, driveType, selectedWaypoint } = this.props;
		if (!waypoint) return <></>;

		return (
			<Modal show={show} onHide={close} size={'xl'}>
				<Modal.Header closeButton>
					<Modal.Title>Waypoint {selectedWaypoint + 1} info</Modal.Title>
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
		paths: state.paths,
		selected: state.selected,
		driveType: state.driveType,
		pathConfig: state.pathConfig,
		fieldConfig: state.fieldConfig,
		selectedWaypoint: state.selectedWaypoint,
		length: state.selected && state.isPathMode ? state.paths[state.selected].waypoints.length : 0,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setWaypoint: async (waypoint, state) => dispatch(await setWaypoint(waypoint, state)),
		removeWaypoint: async (state) => dispatch(await removeWaypoint(state)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Waypoint);
