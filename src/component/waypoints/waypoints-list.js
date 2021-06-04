import HolonomicWaypointInfo from './holonomic-waypoint-info';
import TankWaypointInfo from './tank-waypoint-info';
import { Holonomic, Tank } from 'path-generator';
import { connect } from 'react-redux';
import React from 'react';

class WaypointsList extends React.Component {
	constructor(props) {
		super(props);
		this.getHolonomicWaypointInfo = this.getHolonomicWaypointInfo.bind(this);
		this.getTankWaypointInfo = this.getTankWaypointInfo.bind(this);
		this.getWaypointInfo = this.getWaypointInfo.bind(this);
	}

	getTankWaypointInfo(element, index) {
		return (
			<TankWaypointInfo
				id={index}
				key={index}
				waypoint={element}
				waypointsLength={this.props.path.waypoints.length}
				color={index === this.props.addWaypointInIndex ? 'success' : 'primary'}
			/>
		);
	}

	getHolonomicWaypointInfo(element, index) {
		return (
			<HolonomicWaypointInfo
				id={index}
				key={index}
				waypoint={element}
				waypointsLength={this.props.path.waypoints.length}
				color={index === this.props.addWaypointInIndex ? 'success' : 'primary'}
			/>
		);
	}

	getWaypointInfo(element, index) {
		if (this.props.driveType === Tank) return this.getTankWaypointInfo(element, index);
		else if (this.props.driveType === Holonomic) return this.getHolonomicWaypointInfo(element, index);
		return <span />;
	}

	render() {
		return (
			<div className="AppListView">
				{this.props.path && this.props.path.waypoints.length > 0 ? (
					this.props.path.waypoints.map((element, index) => {
						return this.getWaypointInfo(element, index);
					})
				) : (
					<span>There is no waypoints...</span>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path,
		driveType: state.driveType,
		addWaypointInIndex: state.addWaypointInIndex,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsList);
