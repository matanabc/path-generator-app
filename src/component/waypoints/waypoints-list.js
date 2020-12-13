import TankWaypointInfo from './tank-waypoint-info';
import { connect } from 'react-redux';
import React from 'react';

class WaypointsList extends React.Component {
	render() {
		return (
			<div className="WaypointsList">
				{this.props.path ? (
					this.props.path.waypoints.map((element, index) => {
						return <TankWaypointInfo key={index} id={index} waypoint={element} />;
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
		path: state.path.paths[state.path.selectedPath],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsList);
