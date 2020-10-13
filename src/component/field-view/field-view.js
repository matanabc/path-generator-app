import React from 'react';
import { connect } from 'react-redux';
import fieldImage from '../../images/frc_2020_2.jpg';
import { addWaypoint } from "./field-view-action";

class FieldView extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.whenClick = this.whenClick.bind(this);
    this.drawField = this.drawField.bind(this);
    // this.drawWaypoints = this.drawWaypoints.bind(this);
    // this.setMeterToPixel = this.setMeterToPixel.bind(this);
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.drawField(canvas);
  }

  drawField(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // this.props.fieldViewIsClean();
    const image = new Image();
    image.src = fieldImage;
    const drawWaypoints = this.drawWaypoints;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      // drawWaypoints(canvas);
    }
  }

  // setMeterToPixel() {
  //   const x_min = 130;
  //   const x_max = 754;
  //   const y_min = 20;
  //   const y_max = 440;
  //   const fieldWidth = 16.5354;
  //   const fieldHeight = 8.0010;
  //   const widthMeterToPixel = (fieldWidth) / (x_max - x_min);
  //   const hightMeterToPixel = (fieldHeight) / (y_max - y_min);
  // }

  whenClick(event) {
    const fieldInfo = this.props.filedInfo;
    if (event.layerX > fieldInfo.x_max || event.layerX < fieldInfo.x_min)
      return
    else if (event.layerY > fieldInfo.y_max || event.layerY < fieldInfo.y_min)
      return

    this.props.addWaypoint({
      x: (event.layerX - fieldInfo.x_min) * fieldInfo.widthMeterToPixel,
      y: (event.layerY - fieldInfo.y_min) * fieldInfo.hightMeterToPixel,
    });
  }

  // drawWaypoints(canvas) {
  //   const ctx = canvas.getContext("2d");
  //   const fieldInfo = this.props.filedInfo;
  //   const yMouseToCanvas = canvas.height / canvas.offsetHeight;
  //   const xMouseToCanvas = canvas.width / canvas.offsetWidth;
  //   this.props.waypoints.forEach(waypoint => {
  //     const x = waypoint.x / fieldInfo.widthMeterToPixel + fieldInfo.x_min;
  //     const y = waypoint.y / fieldInfo.hightMeterToPixel + fieldInfo.y_min;
  //     ctx.beginPath();
  //     ctx.arc(xMouseToCanvas * x, yMouseToCanvas * y, 2, 0, Math.PI * 2, false);
  //     ctx.fillStyle = "red";
  //     ctx.fill();
  //   });
  // }

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    if (this.props.listenToMouseClicks)
      canvas.addEventListener('mousedown', this.whenClick);
    else
      canvas.removeEventListener('mousedown', this.whenClick);

    // if (this.props.clearFieldView)
    //   this.drawField(canvas);
    // else
    //   this.drawWaypoints(canvas);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWaypoint: (waypoint) => dispatch(addWaypoint(waypoint)),
    // fieldViewIsClean: () => dispatch(fieldViewIsClean()),
  };
}

const fieldView = connect(mapStateToProps, mapDispatchToProps)(FieldView);
export default fieldView;