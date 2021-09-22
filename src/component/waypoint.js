import { setSelectedWaypoint, setWaypoint, removeWaypoint } from '../redux/path/actions';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { Holonomic } from 'path-generator';
import { MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import 'mousetrap-global-bind';
import React from 'react';

class Waypoint extends React.Component {
	onChange = (value) => this.props.setWaypoint({ ...this.props.waypoint, ...value }, this.props.index);
	onRemove = () => this.props.removeWaypoint(this.props.index);

	render() {
		const { waypoint, index, length } = this.props;
		const disable = JSON.stringify(waypoint) === JSON.stringify({});
		return (
			<div
				style={{
					display: 'flex',
					width: '80%',
					margin: 'auto',
					textAlignLast: 'center',
					marginTop: '15px',
					justifyContent: 'center',
				}}
			>
				<InputGroup.Prepend>
					<InputGroup.Text>X</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					disabled={disable}
					key={`${index}/${length}-x`}
					className="mr-2 ml-1"
					defaultValue={waypoint.x}
					onChange={(e) => this.onChange({ x: Number(e.target.value) })}
				/>

				<InputGroup.Prepend>
					<InputGroup.Text>Y</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					disabled={disable}
					key={`${index}/${length}-y`}
					className="mr-2 ml-1"
					defaultValue={waypoint.y}
					onChange={(e) => this.onChange({ y: Number(e.target.value) })}
				/>

				<InputGroup.Prepend>
					<InputGroup.Text>Angle</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					disabled={disable}
					className="mr-2 ml-1"
					key={`${index}/${length}-angle`}
					defaultValue={waypoint.angle}
					onChange={(e) => this.onChange({ angle: Number(e.target.value) })}
				/>

				{this.props.driveType === Holonomic && (
					<>
						<InputGroup.Prepend>
							<InputGroup.Text>Robot Angle</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							disabled={disable}
							className="mr-2 ml-1"
							key={`${index}/${length}-robotAngle`}
							defaultValue={waypoint.robotAngle}
							onChange={(e) => this.onChange({ robotAngle: Number(e.target.value) })}
						/>
					</>
				)}

				<InputGroup.Prepend>
					<InputGroup.Text>V</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					disabled={disable}
					key={`${index}/${length}-v`}
					className="mr-2 ml-1"
					defaultValue={waypoint.v}
					onChange={(e) => this.onChange({ v: Number(e.target.value) })}
				/>

				<InputGroup.Prepend>
					<InputGroup.Text>vMax</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					disabled={disable}
					className="mr-2 ml-1"
					key={`${index}/${length}-vMax`}
					defaultValue={waypoint.vMax}
					onChange={(e) => this.onChange({ vMax: Number(e.target.value) })}
				/>

				<Button
					variant="danger"
					ref={this.deleteRef}
					className="mr-2 ml-1"
					onClick={this.onRemove}
					disabled={length <= 2 || index === undefined}
				>
					<MdDelete />
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { selectedWaypoint, paths, selected } = state;
	return {
		waypoint: selectedWaypoint !== undefined && selected ? paths[selected].waypoints[selectedWaypoint] : {},
		length: selected ? paths[selected].length : 0,
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

export default connect(mapStateToProps, mapDispatchToProps)(Waypoint);
