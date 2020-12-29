import { changeListenToMouseStatus } from '../../redux/view/actions';
import { Button } from 'react-bootstrap';
import { GiClick } from 'react-icons/gi';
import { connect } from 'react-redux';
import React from 'react';

class ToolsAddWaypoint extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		const Mousetrap = require('mousetrap');
		Mousetrap.bind('a', this.onClick);
	}

	onClick() {
		if (this.props.path) this.props.changeListenToMouseStatus();
	}

	render() {
		return (
			<Button
				size="lg"
				className="mr-3"
				title="Add waypoint with mouse"
				disabled={!this.props.path}
				onClick={this.onClick}
				variant={this.props.listenToMouseClicks ? 'success' : 'primary'}
			>
				<GiClick />
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.paths[state.selectedPath],
		listenToMouseClicks: state.listenToMouseClicks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeListenToMouseStatus: () => dispatch(changeListenToMouseStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsAddWaypoint);
