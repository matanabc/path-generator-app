import React from 'react';
import { connect } from 'react-redux';
import { addWaypoint, setPath } from "./field-view-action";
import { Generator, Waypoint, RobotConfig } from "../../path-generator/path";

class FieldView extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.whenClick = this.whenClick.bind(this);
    this.drawField = this.drawField.bind(this);
    this.drawWaypoints = this.drawWaypoints.bind(this);
    this.drawWaypoints = this.drawWaypoints.bind(this);
    this.drawFieldBorders = this.drawFieldBorders.bind(this);
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.drawField(canvas);
  }

  drawField(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const drawFieldBorders = this.drawFieldBorders;
    const drawWaypoints = this.drawWaypoints;
    const image = new Image();
    image.src = this.props.filedImage
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      drawWaypoints(canvas);
      drawFieldBorders(canvas);
    }
  }

  drawFieldBorders(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(this.props.filedInfo.topLeftX, this.props.filedInfo.topLeftY,
      this.props.filedInfo.filedWidthInPixel, this.props.filedInfo.filedHeigthInPixel);
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }

  drawWaypoints(canvas) {
    const ctx = canvas.getContext("2d");
    if (this.props.paths.length === 0) return;
    this.props.paths[this.props.pathID].waypoints.forEach(waypoint => {
      const x = waypoint.x / this.props.filedInfo.widthPixelToMeter + this.props.filedInfo.topLeftX;
      const y = waypoint.y / this.props.filedInfo.hightPixelToMeter + this.props.filedInfo.topLeftY;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2, false);
      ctx.fillStyle = "red";
      ctx.fill();
    });
    this.drawPath(canvas)
  }

  drawPath(canvas) {
    const ctx = canvas.getContext("2d");
    const waypoints = this.props.paths[this.props.pathID].waypoints;
    const config = new RobotConfig(this.props.robotConfig);
    const path = new Generator(waypoints, config);
    ctx.beginPath();
    path.leftSetpoints.forEach((setpoint, index) => {
      const x = setpoint.x / this.props.filedInfo.widthPixelToMeter + this.props.filedInfo.topLeftX;
      const y = setpoint.y / this.props.filedInfo.hightPixelToMeter + this.props.filedInfo.topLeftY;
      if (index === 0)
        ctx.moveTo(x, y);
      else
        ctx.lineTo(x, y);
    });
    path.rightSetpoints.forEach((setpoint, index) => {
      const x = setpoint.x / this.props.filedInfo.widthPixelToMeter + this.props.filedInfo.topLeftX;
      const y = setpoint.y / this.props.filedInfo.hightPixelToMeter + this.props.filedInfo.topLeftY;
      if (index === 0)
        ctx.moveTo(x, y);
      else
        ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "Yellow";
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`${(path.sourceSetpoints.length * config.robotLoopTime).toFixed(2)}`, 5, 12);
    this.props.setPath(path);
  }

  whenClick(event) {
    const canvas = this.canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = ((event.clientX - rect.left) * scaleX - this.props.filedInfo.topLeftX)
      * this.props.filedInfo.widthPixelToMeter;
    const y = ((event.clientY - rect.top) * scaleY - this.props.filedInfo.topLeftY)
      * this.props.filedInfo.hightPixelToMeter;
    this.props.addWaypoint(new Waypoint(x, y));
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    if (this.props.listenToMouseClicks)
      canvas.addEventListener('mousedown', this.whenClick);
    else
      canvas.removeEventListener('mousedown', this.whenClick);

    this.drawField(canvas);
  }

  render() {
    return (
      <div className="FieldView">
        <canvas className="FieldImage" ref={this.canvasRef} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listenToMouseClicks: state.listenToMouseClicks,
    paths: state.paths,
    clearFieldView: state.clearFieldView,
    setFiledSize: state.setFiledSize,
    filedInfo: state.filedInfo,
    pathID: state.pathID,
    update: state.update,
    robotConfig: state.robotConfig,
    filedImage: state.filedImage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWaypoint: (waypoint) => dispatch(addWaypoint(waypoint)),
    setPath: path => dispatch(setPath(path)),
  };
}

const fieldView = connect(mapStateToProps, mapDispatchToProps)(FieldView);
export default fieldView;