import { Form, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class PlayingBar extends React.Component {
	constructor(props) {
		super(props);
		this.range = React.createRef();
	}

	render() {
		return (
			<Container>
				<Row>
					<Col sm={1} style={{ fontSize: '12px', textAlign: 'end' }}>
						0.00
					</Col>
					<Col>
						<Form.Control ref={this.range} type="range" />
					</Col>
					<Col sm={1} style={{ fontSize: '12px' }}>
						{this.props.path
							? (this.props.path.sourceSetpoints.length * this.props.robotLoopTime).toFixed(2)
							: '0.00'}
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path.paths[state.path.selectedPath],
		robotLoopTime: state.path.pathConfig.robotLoopTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayingBar);
