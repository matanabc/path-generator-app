import React from 'react';
import WaypointInfo from '../waypoint-info/waypoint-info';
import { connect } from 'react-redux';

class WaypointsView extends React.Component {
  render() {
    return (
      <div className="WaypointsView">
        {this.props.paths ? this.props.paths[this.props.pathID].waypoints.map((element, index) => {
          return <WaypointInfo key={index} id={index} />
        }) : <span>There is no waypoint...</span>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    paths: state.paths,
    pathID: state.pathID,
    update: state.update,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
}

const waypointsView = connect(mapStateToProps, mapDispatchToProps)(WaypointsView);
export default waypointsView;