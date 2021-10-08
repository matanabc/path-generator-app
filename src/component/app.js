import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

import { projectInit } from '../handlers/project-handler';
import { appUpdaterInit } from '../handlers/app-handler';
import NewVersionPopup from './popups/new-version-popup';
import FieldView from './field-view/field-view';
import { CANCEL_SHORTCUT } from '../shortcut';
import Settings from './settings/settings';
import PlayingBar from './playing-bar';
import Tools from './tools/tools';

class App extends React.Component {
	componentDidMount() {
		appUpdaterInit(this.props.dispatch);
		projectInit(this.props.dispatch);
		mousetrap.bindGlobal(CANCEL_SHORTCUT, () => {
			if (document.activeElement) document.activeElement.blur();
		});
	}

	render() {
		return (
			<div className="App">
				<NewVersionPopup newVersion={this.props.newVersion} />
				<Settings />
				<FieldView />
				<div id="bottom">
					<PlayingBar />
					<Tools />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPathMode: state.isPathMode,
		newVersion: state.newVersion,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch: (value) => dispatch(value),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
