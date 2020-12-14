import WaypointsList from './waypoints/waypoints-list';
import FieldView from './field-view/field-view';
import { Container } from 'react-bootstrap';
import PlayingBar from './playing-bar';
import { connect } from 'react-redux';
import Popups from './popups/popups';
import Tools from './ tools';
import React from 'react';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Container fluid="md">
					<Popups />
					<FieldView />
					<PlayingBar />
					<Tools />
					<WaypointsList />
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
