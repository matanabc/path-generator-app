import TankWaypointInfo from './tank-waypoint-info';
import { connect } from 'react-redux';
import React from 'react';

class WaypointsList extends React.Component {
	render() {
		return (
			<div className="WaypointsList">
				{this.props.path ? (
					this.props.path.waypoints.map((element, index) => {
						return (
							<TankWaypointInfo
								id={index}
								key={index}
								waypoint={element}
								color={index === this.props.addWaypointInIndex ? 'success' : 'primary'}
							/>
						);
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
		path: state.paths[state.selectedPath],
		addWaypointInIndex: state.addWaypointInIndex,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsList);
