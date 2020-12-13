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
						00:00
					</Col>
					<Col>
						<Form.Control ref={this.range} type="range" />
					</Col>
					<Col sm={1} style={{ fontSize: '12px' }}>
						00:00
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

const playingBar = connect(mapStateToProps, mapDispatchToProps)(PlayingBar);
export default playingBar;
