import { changeRangePosition, setDrawRobotInterval } from '../redux/view/actions';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class PlayingBar extends React.Component {
	constructor(props) {
		super(props);
		this.range = React.createRef();
		this.changeRangePosition = this.changeRangePosition.bind(this);
	}

	componentDidMount() {
		this.range.current.value = 0;
		this.range.current.disabled = true;
		document.querySelector('canvas').addEventListener('wheel', (event) => {
			const { selectedWaypoint, rangePosition } = this.props;
			if (selectedWaypoint === undefined) {
				this.changeRangePosition(rangePosition - Math.sign(event.deltaY));
			}
		});
	}

	componentDidUpdate() {
		if (this.props.path) {
			this.range.current.max = this.props.path.coords.length - 1;
			this.range.current.value = this.props.rangePosition;
			this.range.current.disabled = false;
		} else {
			this.range.current.disabled = true;
			this.range.current.value = 0;
		}
	}

	changeRangePosition(newPosition) {
		if (!this.props.path) return;
		this.props.setDrawRobotInterval();
		const lastPosition = this.props.rangePosition;
		const maxPosition = this.props.path.coords.length - 1;
		const position = newPosition >= 0 && newPosition <= maxPosition ? newPosition : lastPosition;
		this.props.changeRangePosition(position);
	}

	render() {
		const style = { fontSize: '12px' };
		const { rangePosition, robotLoopTime, path } = this.props;
		return (
			<Container>
				<Row>
					<Col sm={0.5} style={style}>
						{path ? (robotLoopTime * rangePosition).toFixed(2) : '0.00'}
					</Col>
					<Col>
						<Form.Control
							ref={this.range}
							type="range"
							onChange={(event) => this.changeRangePosition(event.target.value)}
						/>
					</Col>
					<Col sm={0.5} style={style}>
						{path && !path.isIllegal() ? ((path.coords.length - 1) * robotLoopTime).toFixed(2) : '0.00'}
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path,
		rangePosition: state.rangePosition,
		selectedWaypoint: state.selectedWaypoint,
		robotLoopTime: state.pathConfig.robotLoopTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeRangePosition: (position) => dispatch(changeRangePosition(position)),
		setDrawRobotInterval: () => dispatch(setDrawRobotInterval()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayingBar);
