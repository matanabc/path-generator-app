import WaypointsList from './waypoints/waypoints-list';
import { init } from '../handlers/project-handler';
import FieldView from './field-view/field-view';
import { isWeb } from '../redux/view/actions';
import { Container } from 'react-bootstrap';
import Settings from './settings/settings';
import PlayingBar from './playing-bar';
import { connect } from 'react-redux';
import Popups from './popups/popups';
import Tools from './ tools';
import React from 'react';

class App extends React.Component {
	componentDidMount() {
		init(this.props.isWeb);
	}

	render() {
		return (
			<div className="App">
				<Container fluid="md">
					<Popups />
					<Settings />
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
	return {
		isWeb: (value) => dispatch(isWeb(value)),
	};
};

const app = connect(mapStateToProps, mapDispatchToProps)(App);
export default app;
