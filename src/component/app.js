import { projectInit } from '../handlers/project-handler';
import { appUpdaterInit } from '../handlers/app-handler';
import FieldView from './field-view/field-view';
import Settings from './settings/settings';
import PlayingBar from './playing-bar';
import { connect } from 'react-redux';
import Popups from './popups/popups';
import Tools from './tools/tools';
import mousetrap from 'mousetrap';
import Waypoint from './waypoint';
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
				<Waypoint />
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
