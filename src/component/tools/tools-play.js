import { setDrawRobotInterval, changeRangePosition } from '../../redux/view/actions';
import { Button } from 'react-bootstrap';
import { MdPlayArrow, MdReplay, MdPause } from 'react-icons/md';
import { PopupsConfig } from '../popups/popups-config';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsPlay extends React.Component {
	componentDidMount() {
		mousetrap.bindGlobal('space', this.onClick);
		window.onkeydown = (e) => e.keyCode !== 32;
	}

	onClick = () => {
		if (JSON.stringify(this.props.popupsStatus) !== JSON.stringify(new PopupsConfig())) return;
		if (document.activeElement) document.activeElement.blur();
		var interval = undefined;
		if (this.canCreateInterval()) {
			if (this.isRangePositionInTheEnd()) this.props.changeRangePosition(0);
			interval = setInterval(this.updateRangePosition, this.props.robotLoopTime * 1000);
		}
		this.props.setDrawRobotInterval(interval);
	};

	updateRangePosition = () => {
		if (this.isRangePositionInTheEnd()) this.props.setDrawRobotInterval();
		else this.props.changeRangePosition(this.props.rangePosition + 1);
	};

	canCreateInterval = () => {
		return (
			this.props.path &&
			!this.props.drawRobotInterval &&
			this.props.path.coords.length > 0 &&
			!this.props.popupsStatus.settingsPopup
		);
	};

	isRangePositionInTheEnd = () => {
		return this.props.path && this.props.path.coords.length - 1 === this.props.rangePosition;
	};

	getPlayButtonIcon = () => {
		if (this.props.drawRobotInterval) return <MdPause />;
		else if (this.isRangePositionInTheEnd()) return <MdReplay />;
		else return <MdPlayArrow />;
	};

	render() {
		return (
			<Button
				size="lg"
				className="mr-3 ml-4"
				onClick={this.onClick}
				disabled={!this.props.path || this.props.path.waypoints.length <= 1 || this.props.path.isIllegal()}
			>
				{this.getPlayButtonIcon()}
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path,
		popupsStatus: state.popupsStatus,
		rangePosition: state.rangePosition,
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

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPlay);
