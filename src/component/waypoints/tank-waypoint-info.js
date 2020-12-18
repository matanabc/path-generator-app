import { Button, Alert, FormControl, InputGroup } from 'react-bootstrap';
import { setWaypoint, removeWaypoint } from '../../redux/path/actions';
import { changeListenToMouseStatus } from '../../redux/view/actions';
import { MdDelete, MdAddCircle } from 'react-icons/md';
import { connect } from 'react-redux';
import React from 'react';

class TankWaypointInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { id: -1, pathName: undefined, waypointsLength: -1 };
		this.x = React.createRef();
		this.y = React.createRef();
		this.v = React.createRef();
		this.vMax = React.createRef();
		this.angle = React.createRef();
		this.add = this.add.bind(this);
		this.remove = this.remove.bind(this);
		this.onChange = this.onChange.bind(this);
		this.getValue = this.getValue.bind(this);
		this.isNeedToUpdateState = this.isNeedToUpdateState.bind(this);
	}

	isNeedToUpdateState() {
		return (
			this.state.id !== this.props.id ||
			this.state.pathName !== this.props.pathName ||
			this.state.waypointsLength !== this.props.waypointsLength
		);
	}

	getValue(currentValue, value) {
		if (this.isNeedToUpdateState()) return value;
		return Number.isNaN(currentValue) ? value : currentValue;
	}

	componentDidUpdate() {
		this.angle.current.value = this.getValue(this.angle.current.value, this.props.waypoint.angle);
		this.vMax.current.value = this.getValue(this.vMax.current.value, this.props.waypoint.vMax);
		this.x.current.value = this.getValue(this.x.current.value, this.props.waypoint.x);
		this.y.current.value = this.getValue(this.y.current.value, this.props.waypoint.y);
		this.v.current.value = this.getValue(this.v.current.value, this.props.waypoint.v);
		if (this.vMax.current.value > this.props.waypoint.vMax)
			this.vMax.current.value = this.props.waypoint.vMax;

		if (this.isNeedToUpdateState()) {
			this.setState(() => {
				return {
					id: this.props.id,
					pathName: this.props.pathName,
					waypointsLength: this.props.waypointsLength,
				};
			});
		}
	}

	onChange() {
		const object = {
			x: Number(this.x.current.value),
			y: Number(this.y.current.value),
			v: Number(this.v.current.value),
			vMax: Number(this.vMax.current.value),
			angle: Number(this.angle.current.value),
		};
		this.props.setWaypoint(object, this.props.id);
	}

	remove() {
		this.props.removeWaypoint(this.props.id);
	}

	add() {
		this.props.changeListenToMouseStatus(this.props.id);
	}

	render() {
		return (
			<Alert className={this.props.id > 0 ? 'mb-0 mt-2' : 'mb-0 mt-0'} variant="primary">
				<InputGroup>
					<span className="mr-4"> {this.props.id + 1} </span>

					<InputGroup.Prepend>
						<InputGroup.Text>X</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						ref={this.x}
						defaultValue={this.props.waypoint.x}
						onChange={this.onChange}
					/>

					<InputGroup.Prepend>
						<InputGroup.Text>Y</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						ref={this.y}
						defaultValue={this.props.waypoint.y}
						onChange={this.onChange}
					/>

					<InputGroup.Prepend>
						<InputGroup.Text>Angle</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						ref={this.angle}
						defaultValue={this.props.waypoint.angle}
						onChange={this.onChange}
					/>

					<InputGroup.Prepend>
						<InputGroup.Text>V</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						ref={this.v}
						defaultValue={this.props.waypoint.v}
						onChange={this.onChange}
					/>

					<InputGroup.Prepend>
						<InputGroup.Text>vMax</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						ref={this.vMax}
						defaultValue={this.props.waypoint.vMax}
						onChange={this.onChange}
					/>

					<Button className="mr-2" variant="danger" onClick={this.remove}>
						<MdDelete />
					</Button>

					<Button onClick={this.add} variant={this.props.color}>
						<MdAddCircle />
					</Button>
				</InputGroup>
			</Alert>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathName: state.selectedPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeListenToMouseStatus: (index) => dispatch(changeListenToMouseStatus(index)),
		setWaypoint: (waypoint, index) => dispatch(setWaypoint(waypoint, index)),
		removeWaypoint: (index) => dispatch(removeWaypoint(index)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TankWaypointInfo);
