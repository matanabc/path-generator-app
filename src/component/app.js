import { Container, Row } from 'react-bootstrap';
import FieldView from './field-view';
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
