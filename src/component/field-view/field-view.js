import React from 'react';
import { connect } from 'react-redux';
import { addWaypoint, setPath } from "./field-view-action";
import { PathWaypoint } from "../../path-generator/path-generator";
import PlayingBar from "../playing-bar/playing-bar";
import { drawOnCanvas } from "./canvas-painter";

class FieldView extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.whenClick = this.whenClick.bind(this);
  }

  componentDidMount() {
    drawOnCanvas(this.canvasRef.current, this.props);
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    if (this.props.listenToMouseClicks)
      canvas.addEventListener('mousedown', this.whenClick);
    else
      canvas.removeEventListener('mousedown', this.whenClick);

    drawOnCanvas(this.canvasRef.current, this.props);
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
    this.props.addWaypoint(new PathWaypoint(Number(x.toFixed(3)), Number(y.toFixed(3))));
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
    robotDrawConfig: state.robotDrawConfig,
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