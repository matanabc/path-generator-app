import { changeListenToMouseStatus } from '../../redux/view/actions';
import { GiClick } from 'react-icons/all';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsAddWaypoint extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		mousetrap.bindGlobal(['command+a', 'alt+a'], this.onClick);
	}

	onClick() {
		if (document.activeElement) document.activeElement.blur();
		if (this.props.path && this.props.isPathMode) this.props.changeListenToMouseStatus();
	}

	render() {
		return (
			<Button
				size="lg"
				title="Add waypoint with mouse"
				className="mr-3"
				onClick={this.onClick}
				disabled={!this.props.path}
				variant={this.props.listenToMouseClicks ? 'success' : 'primary'}
			>
				<GiClick />
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path,
		isPathMode: state.isPathMode,
		listenToMouseClicks: state.listenToMouseClicks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeListenToMouseStatus: () => dispatch(changeListenToMouseStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsAddWaypoint);
