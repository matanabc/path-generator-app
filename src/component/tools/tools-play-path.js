import { setDrawRobotInterval, changeRangePosition } from '../../redux/view/actions';
import { MdPlayArrow, MdReplay, MdPause } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class ToolsPlayPath extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.canCreateInterval = this.canCreateInterval.bind(this);
		this.getPlayButtonIcon = this.getPlayButtonIcon.bind(this);
		this.updateRangePosition = this.updateRangePosition.bind(this);
		this.isRangePositionInTheEnd = this.isRangePositionInTheEnd.bind(this);
	}

	componentDidMount() {
		const Mousetrap = require('mousetrap');
		Mousetrap.bind('space', this.onClick);
	}

	onClick() {
		var interval = undefined;
		if (this.canCreateInterval()) {
			if (this.isRangePositionInTheEnd()) this.props.changeRangePosition(0);
			interval = setInterval(this.updateRangePosition, this.props.robotLoopTime * 1000);
		}
		this.props.setDrawRobotInterval(interval);
	}

	updateRangePosition() {
		if (this.isRangePositionInTheEnd()) this.props.setDrawRobotInterval();
		else this.props.changeRangePosition(this.props.rangePosition + 1);
	}

	canCreateInterval() {
		return (
			this.props.path && !this.props.drawRobotInterval && this.props.path.sourceSetpoints.length > 0
		);
	}

	isRangePositionInTheEnd() {
		return (
			this.props.path && this.props.path.sourceSetpoints.length - 1 === this.props.rangePosition
		);
	}

	getPlayButtonIcon() {
		if (this.props.drawRobotInterval) return <MdPause />;
		else if (this.isRangePositionInTheEnd()) return <MdReplay />;
		else return <MdPlayArrow />;
	}

	render() {
		return (
			<Button
				className="mr-3 ml-4"
				size="lg"
				onClick={this.onClick}
				disabled={!this.props.path || this.props.path.isIllegal()}
			>
				{this.getPlayButtonIcon()}
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		rangePosition: state.rangePosition,
		path: state.paths[state.selectedPath],
		drawRobotInterval: state.drawRobotInterval,
		robotLoopTime: state.pathConfig.robotLoopTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setDrawRobotInterval: (interval) => dispatch(setDrawRobotInterval(interval)),
		changeRangePosition: (position) => dispatch(changeRangePosition(position)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPlayPath);
