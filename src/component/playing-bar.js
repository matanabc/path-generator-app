import { changeRangePosition } from '../redux/view/actions';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class PlayingBar extends React.Component {
	constructor(props) {
		super(props);
		this.range = React.createRef();
	}

	componentDidMount() {
		this.range.current.disabled = true;
		this.range.current.value = 0;
	}

	componentDidUpdate() {
		if (this.props.path) {
			this.range.current.max = this.props.path.sourceSetpoints.length - 1;
			this.range.current.value = this.props.rangePosition;
			this.range.current.disabled = false;
		} else {
			this.range.current.disabled = true;
			this.range.current.value = 0;
		}
	}

	render() {
		return (
			<Container>
				<Row>
					<Col sm={1} style={{ fontSize: '12px', textAlign: 'end' }}>
						{(this.props.robotLoopTime * this.props.rangePosition).toFixed(2)}
					</Col>
					<Col>
						<Form.Control ref={this.range} type="range" onChange={this.props.changeRangePosition} />
					</Col>
					<Col sm={1} style={{ fontSize: '12px' }}>
						{this.props.path
							? ((this.props.path.sourceSetpoints.length - 1) * this.props.robotLoopTime).toFixed(2)
							: '0.00'}
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		rangePosition: state.view.rangePosition,
		path: state.path.paths[state.path.selectedPath],
		robotLoopTime: state.path.pathConfig.robotLoopTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeRangePosition: (event) => dispatch(changeRangePosition(event.target.value)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayingBar);
