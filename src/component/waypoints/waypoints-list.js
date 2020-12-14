import TankWaypointInfo from './tank-waypoint-info';
import { connect } from 'react-redux';
import React from 'react';

class WaypointsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { updateList: false };
		this.updateList = this.updateList.bind(this);
		this.finishUpdateList = this.finishUpdateList.bind(this);
	}

	updateList() {
		this.setState(() => {
			return { updateList: true };
		});
	}

	finishUpdateList() {
		this.setState(() => {
			return { updateList: false };
		});
	}

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
								remove={this.updateList}
								update={this.finishUpdateList}
								needUpdate={this.state.updateList}
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsList);
