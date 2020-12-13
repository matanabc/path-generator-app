import { Container, Row } from 'react-bootstrap';
import FieldView from './field-view';
import PlayingBar from './playing-bar';
import { connect } from 'react-redux';
import React from 'react';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Container fluid="md">
					<Row>
						<FieldView />
					</Row>
					<PlayingBar />
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

const app = connect(mapStateToProps, mapDispatchToProps)(App);
export default app;
