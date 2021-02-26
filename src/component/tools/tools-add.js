import { changeListenToMouseStatus } from '../../redux/view/actions';
import { GiClick, BiAddToQueue } from 'react-icons/all';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsAdd extends React.Component {
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
		const title = this.props.isPathMode ? 'Add waypoint with mouse' : 'Add path to group';
		return (
			<Button
				size="lg"
				title={title}
				className="mr-3"
				onClick={this.onClick}
				disabled={!this.props.path}
				variant={this.props.listenToMouseClicks ? 'success' : 'primary'}
			>
				{this.props.isPathMode ? <GiClick /> : <BiAddToQueue />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ToolsAdd);
