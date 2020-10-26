import React from 'react';
import { connect } from 'react-redux';
import { addWaypoint, setPath } from "./field-view-action";
import { PathWaypoint } from "../../path-generator/path-generator";
import PlayingBar from "../playing-bar/playing-bar";

class FieldView extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
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
    if (this.props.fieldConfig === undefined) return;
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
    ctx.rect(this.props.fieldConfig.topLeftXPixel, this.props.fieldConfig.topLeftYPixel,
      this.props.fieldConfig.widthInPixel, this.props.fieldConfig.heigthInPixel);
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }

  drawWaypoints(ctx) {
    this.props.paths[this.props.pathID].waypoints.forEach(waypoint => {
      const x = waypoint.x / this.props.fieldConfig.widthPixelToMeter + this.props.fieldConfig.topLeftXPixel;
      const y = waypoint.y / this.props.fieldConfig.hightPixelToMeter + this.props.fieldConfig.topLeftYPixel;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2, false);
      ctx.fillStyle = "red";
      ctx.fill();
    });
    this.drawPath(ctx)
  }

  drawPath(ctx) {
    if (!this.props.path) return;
    const config = this.props.pathConfig;
    const path = this.props.path;
    ctx.beginPath();
    path.leftSetpoints.forEach((setpoint, index) => {
      const x = setpoint.x / this.props.fieldConfig.widthPixelToMeter + this.props.fieldConfig.topLeftXPixel;
      const y = setpoint.y / this.props.fieldConfig.hightPixelToMeter + this.props.fieldConfig.topLeftYPixel;
      if (index === 0)
        ctx.moveTo(x, y);
      else
        ctx.lineTo(x, y);
    });
    path.rightSetpoints.forEach((setpoint, index) => {
      const x = setpoint.x / this.props.fieldConfig.widthPixelToMeter + this.props.fieldConfig.topLeftXPixel;
      const y = setpoint.y / this.props.fieldConfig.hightPixelToMeter + this.props.fieldConfig.topLeftYPixel;
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
    this.drawRobot(ctx, path, config);
  }

  drawRobot(ctx, path, config) {
    const setpoint = path.sourceSetpoints[this.props.rangePosition];
    if (setpoint === undefined) return;
    ctx.beginPath();
    const w = (Number(config.width) + 0.2) / this.props.fieldConfig.widthPixelToMeter + 5;
    const h = (Number(config.width) + 0.2) / this.props.fieldConfig.widthPixelToMeter;
    const x = setpoint.x / this.props.fieldConfig.widthPixelToMeter - w / 2 +
      this.props.fieldConfig.topLeftXPixel;
    const y = setpoint.y / this.props.fieldConfig.hightPixelToMeter - h / 2 +
      this.props.fieldConfig.topLeftYPixel;

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
    const x = ((event.clientX - rect.left) * scaleX - this.props.fieldConfig.topLeftXPixel)
      * this.props.fieldConfig.widthPixelToMeter;
    const y = ((event.clientY - rect.top) * scaleY - this.props.fieldConfig.topLeftYPixel)
      * this.props.fieldConfig.hightPixelToMeter;
    this.props.addWaypoint(new PathWaypoint(x, y));
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
        <PlayingBar canvasRef={this.canvasRef} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listenToMouseClicks: state.listenToMouseClicks,
    clearFieldView: state.clearFieldView,
    rangePosition: state.rangePosition,
    fieldConfig: state.fieldConfig,
    pathConfig: state.pathConfig,
    filedImage: state.filedImage,
    pathID: state.pathID,
    update: state.update,
    paths: state.paths,
    path: state.path,
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