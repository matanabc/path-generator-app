import React from 'react';
import { connect } from 'react-redux';
import { addWaypoint, setPath } from "./field-view-action";
import { Generator, Waypoint, RobotConfig } from "../../path-generator/path";
import { Form } from "react-bootstrap";

class FieldView extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.rangeInput = React.createRef();
    this.drawFieldBorders = this.drawFieldBorders.bind(this);
    this.drawWaypoints = this.drawWaypoints.bind(this);
    this.drawWaypoints = this.drawWaypoints.bind(this);
    this.whenClick = this.whenClick.bind(this);
    this.drawField = this.drawField.bind(this);
    this.drawRobot = this.drawRobot.bind(this);
  }

  componentDidMount() {
    this.drawField();
  }

  drawField() {
    if (this.props.filedInfo === undefined) return;
    if (this.props.paths.length === 0) return;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawFieldBorders(canvas);
    this.drawWaypoints(ctx);
  }

  drawFieldBorders(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(this.props.filedInfo.topLeftX, this.props.filedInfo.topLeftY,
      this.props.filedInfo.filedWidthInPixel, this.props.filedInfo.filedHeigthInPixel);
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }

  drawWaypoints(ctx) {
    this.props.paths[this.props.pathID].waypoints.forEach(waypoint => {
      const x = waypoint.x / this.props.filedInfo.widthPixelToMeter + this.props.filedInfo.topLeftX;
      const y = waypoint.y / this.props.filedInfo.hightPixelToMeter + this.props.filedInfo.topLeftY;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2, false);
      ctx.fillStyle = "red";
      ctx.fill();
    });
    this.drawPath(ctx)
  }

  drawPath(ctx) {
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
    ctx.fillStyle = "white";
    ctx.fillText(`${(path.sourceSetpoints.length * config.robotLoopTime).toFixed(2)}`, 5, 12);
    this.props.setPath(path);
    this.drawRobot(ctx, path, config);
  }

  drawRobot(ctx, path, config) {
    const rangePosition = Number(this.rangeInput.current.value) / 100;
    var setpointNumber = Number((path.sourceSetpoints.length * rangePosition).toFixed(0));
    if (setpointNumber === path.sourceSetpoints.length)
      setpointNumber = path.sourceSetpoints.length - 1;
    const setpoint = path.sourceSetpoints[setpointNumber];
    if (setpoint === undefined) return;
    ctx.beginPath();
    const w = (Number(config.width) + 0.2) / this.props.filedInfo.widthPixelToMeter + 5;
    const h = (Number(config.width) + 0.2) / this.props.filedInfo.widthPixelToMeter;
    const x = setpoint.x / this.props.filedInfo.widthPixelToMeter - w / 2 +
      this.props.filedInfo.topLeftX;
    const y = setpoint.y / this.props.filedInfo.hightPixelToMeter - h / 2 +
      this.props.filedInfo.topLeftY;

    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(setpoint.heading);
    ctx.fillStyle = "white";
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
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

    this.drawField();
  }

  render() {
    return (
      <div className="FieldView">
        <canvas className="FieldImage" ref={this.canvasRef} style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: "url(" + this.props.filedImage + ")"
        }} />
        <Form.Control ref={this.rangeInput} onChange={this.drawField} defaultValue="0" type="range" custom />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listenToMouseClicks: state.listenToMouseClicks,
    clearFieldView: state.clearFieldView,
    setFiledSize: state.setFiledSize,
    robotConfig: state.robotConfig,
    filedImage: state.filedImage,
    filedInfo: state.filedInfo,
    pathID: state.pathID,
    update: state.update,
    paths: state.paths,
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