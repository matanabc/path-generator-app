import { setSelectedWaypoint, setWaypoint, removeWaypoint } from '../redux/path/actions';
import { Modal, FormControl, InputGroup, Button } from 'react-bootstrap';
import { Holonomic } from 'path-generator';
import { MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import 'mousetrap-global-bind';
import React from 'react';

class Settings extends React.Component {
	onChange = (value) => this.props.setWaypoint({ ...this.props.waypoint, ...value }, this.props.index);
	remove = () => this.props.removeWaypoint(this.props.index);
	render() {
		const { waypoint, close } = this.props;
		if (!waypoint) return <></>;
		return (
			<Modal show={true} onHide={close} size={'xl'}>
				<Modal.Body style={{ display: 'flex' }}>
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

					{this.props.driveType === Holonomic && (
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

					<Button ref={this.deleteRef} className="mr-2" variant="danger" onClick={this.remove}>
						<MdDelete />
					</Button>
				</Modal.Body>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	const { selectedWaypoint, path } = state;
	return {
		waypoint: selectedWaypoint !== undefined && path ? state.path.waypoints[selectedWaypoint] : undefined,
		driveType: state.driveType,
		index: selectedWaypoint,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setWaypoint: (waypoint, index) => dispatch(setWaypoint(waypoint, index)),
		close: () => dispatch(setSelectedWaypoint(undefined)),
		removeWaypoint: (index) => dispatch(removeWaypoint(index)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
