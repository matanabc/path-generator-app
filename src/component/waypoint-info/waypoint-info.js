import React from 'react';
import { Button, Alert, FormControl, InputGroup } from 'react-bootstrap';
import { MdDelete, MdAddCircle } from "react-icons/md";
import { connect } from 'react-redux';
import { updateWaypoint, addWaypoint, removeWaypoint } from './waypoint-info-action';

class WaypointInfo extends React.Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this)
    this.add = this.add.bind(this)
    this.updateX = this.updateX.bind(this)
    this.updateY = this.updateY.bind(this)
    this.updateAngle = this.updateAngle.bind(this)
    this.updateV = this.updateV.bind(this)
    this.updateVMax = this.updateVMax.bind(this)
  }

  updateX(event) {
    this.props.updateWaypoint(this.props.id, "x", event.target.value);
  }

  updateY(event) {
    this.props.updateWaypoint(this.props.id, "y", event.target.value);
  }

  updateAngle(event) {
    this.props.updateWaypoint(this.props.id, "angle", event.target.value);
  }

  updateV(event) {
    this.props.updateWaypoint(this.props.id, "v", event.target.value);
  }

  updateVMax(event) {
    this.props.updateWaypoint(this.props.id, "vMax", event.target.value);
  }

  add() {
    this.props.addWaypoint(this.props.id);
  }

  remove() {
    this.props.removeWaypoint(this.props.id);
  }

  render() {
    const info = this.props.paths[this.props.pathID].waypoints[this.props.id];
    var variant = "primary";
    if (this.props.waypointID !== undefined && this.props.waypointID === this.props.id)
      variant = "success";
    return (
      <div className="WaypointInfo">
        <Alert variant="primary">
          <InputGroup>
            <span className="mr-4"> {this.props.id + 1} </span>

            <InputGroup.Prepend>
              <InputGroup.Text>X</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="mr-2" type="number" value={info.x ? info.x : 0} onChange={this.updateX} />

            <InputGroup.Prepend>
              <InputGroup.Text>Y</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="mr-2" type="number" value={info.y ? info.y : 0} onChange={this.updateY} />

            <InputGroup.Prepend>
              <InputGroup.Text>Angle</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="mr-2" value={info.angle} onChange={this.updateAngle} />

            <InputGroup.Prepend>
              <InputGroup.Text>V</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="mr-2" type="number" value={info.v ? info.v : 0} onChange={this.updateV} />

            <InputGroup.Prepend>
              <InputGroup.Text>vMax</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="mr-2" type="number" value={info.vMax ? info.vMax : 0} onChange={this.updateVMax} />

            <Button className="mr-2" variant="danger" onClick={this.remove}>
              <MdDelete />
            </Button>

            <Button onClick={this.add} variant={variant}>
              <MdAddCircle />
            </Button>
          </InputGroup>
        </Alert>
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return {
    waypointID: state.waypointID,
    pathID: state.pathID,
    update: state.update,
    paths: state.paths,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateWaypoint: (id, key, value) => dispatch(updateWaypoint(id, key, value)),
    addWaypoint: index => dispatch(addWaypoint(index)),
    removeWaypoint: index => dispatch(removeWaypoint(index)),
  };
}

const waypointInfo = connect(mapStateToProps, mapDispatchToProps)(WaypointInfo);
export default waypointInfo;