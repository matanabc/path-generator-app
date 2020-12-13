import { connect } from 'react-redux';
import React from 'react';

class WaypointsList extends React.Component {
	render() {
		return (
			<div className="WaypointsList">
				<span>There is no waypoints...</span>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsList);
