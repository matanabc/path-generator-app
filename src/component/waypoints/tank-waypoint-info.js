import { setWaypoint, removeWaypoint } from '../../redux/path/actions';
import { Button, Alert, FormControl, InputGroup } from 'react-bootstrap';
import { MdDelete, MdAddCircle } from 'react-icons/md';
import { connect } from 'react-redux';
import React from 'react';

class TankWaypointInfo extends React.Component {
	constructor(props) {
		super(props);
		this.x = React.createRef();
		this.y = React.createRef();
		this.v = React.createRef();
		this.vMax = React.createRef();
		this.angle = React.createRef();
		this.remove = this.remove.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidUpdate() {
		if (this.props.needUpdate) {
			this.x.current.value = this.props.waypoint.x;
			this.y.current.value = this.props.waypoint.y;
			this.v.current.value = this.props.waypoint.v;
			this.vMax.current.value = this.props.waypoint.vMax;
			this.angle.current.value = this.props.waypoint.angle;
			this.props.update();
		}
	}

	onChange() {
		const object = {
			x: this.x.current.value,
			y: this.y.current.value,
			v: this.v.current.value,
			vMax: this.vMax.current.value,
			angle: this.angle.current.value,
		};
		this.props.setWaypoint(object, this.props.id);
	}

	remove() {
		this.props.removeWaypoint(this.props.id);
		this.props.remove();
	}

	render() {
		return (
			<Alert variant="primary">
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

					<Button onClick={this.add}>
						<MdAddCircle />
					</Button>
				</InputGroup>
			</Alert>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setWaypoint: (waypoint, index) => dispatch(setWaypoint(waypoint, index)),
		removeWaypoint: (index) => dispatch(removeWaypoint(index)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TankWaypointInfo);
