import { projectInit } from '../handlers/project-handler';
import { appUpdaterInit } from '../handlers/app-handler';
import WaypointsList from './waypoints/waypoints-list';
import FieldView from './field-view/field-view';
import { Container } from 'react-bootstrap';
import PathsList from './paths/paths-list';
import Settings from './settings/settings';
import PlayingBar from './playing-bar';
import { connect } from 'react-redux';
import Popups from './popups/popups';
import Tools from './tools/tools';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';
class App extends React.Component {
	componentDidMount() {
		appUpdaterInit(this.props.dispatch);
		projectInit(this.props.dispatch);
		mousetrap.bindGlobal('esc', () => {
			if (document.activeElement) document.activeElement.blur();
		});
	}

	render() {
		return (
			<div className="App">
				<Popups />
				<Settings />
				<FieldView />
				<PlayingBar />
				<Tools />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPathMode: state.isPathMode,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: (value) => dispatch(value),
	};
};

const app = connect(mapStateToProps, mapDispatchToProps)(App);
export default app;
