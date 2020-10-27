import React from 'react';
import { connect } from 'react-redux';
import { Form } from "react-bootstrap";
import { setRangePosition, addToRangePosition } from "./playing-bar-action";
import { setDrawRobotInterval } from "../tools/tools-action";

class PlayingBar extends React.Component {
  constructor(props) {
    super(props);
    this.changeRangePosition = this.changeRangePosition.bind(this);
    this.rangeInput = React.createRef();
  }

  componentDidMount() {
    const canvas = this.props.canvasRef.current;
    canvas.addEventListener("wheel", event => {
      if (this.props.robotDrawConfig.drawRobotInterval)
        this.props.setDrawRobotInterval(this.props.robotDrawConfig.drawRobotInterval);
      this.props.addToRangePosition(-Math.sign(event.deltaY));
    });
  }

  componentDidUpdate() {
    if (this.props.path !== undefined) {
      this.rangeInput.current.max = this.props.path.sourceSetpoints.length - 1;
    }
  }

  changeRangePosition(event) {
    this.props.setRangePosition(event.target.value);
  }

  render() {
    return (
      <div className="PlayingBar">
        <Form.Control ref={this.rangeInput} value={this.props.rangePosition} type="range"
          onChange={this.changeRangePosition} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    robotDrawConfig: state.robotDrawConfig,
    rangePosition: state.rangePosition,
    path: state.path,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDrawRobotInterval: (interval) => dispatch(setDrawRobotInterval(interval)),
    setRangePosition: rangePosition => dispatch(setRangePosition(rangePosition)),
    addToRangePosition: add => dispatch(addToRangePosition(add)),
  };
}

const playingBar = connect(mapStateToProps, mapDispatchToProps)(PlayingBar);
export default playingBar;