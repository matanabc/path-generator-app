import React from 'react';
import { Button, Alert, FormControl, InputGroup } from 'react-bootstrap';
import { MdDelete, MdAddCircle } from 'react-icons/md';
import { connect } from 'react-redux';

class TankWaypointInfo extends React.Component {
	constructor(props) {
		super(props);
		this.x = React.createRef();
		this.y = React.createRef();
		this.v = React.createRef();
		this.vMax = React.createRef();
		this.angle = React.createRef();
		this.onChange = this.onChange.bind(this);
	}

	onChange() {
		console.log('.');
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
						value={this.props.waypoint.v}
						defaultValue={this.onChange}
					/>

					<InputGroup.Prepend>
						<InputGroup.Text>vMax</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						className="mr-2"
						ref={this.vMax}
						value={this.props.waypoint.vMax}
						defaultValue={this.onChange}
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
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TankWaypointInfo);
