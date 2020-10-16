import React from 'react';
import { connect } from 'react-redux';
import { Form } from "react-bootstrap";
import { setRangePosition, addToRangePosition } from "./playing-bar-action";
import { setDrawRobotInterval } from "../tools/tools-action";

class PlayingBar extends React.Component {
  constructor(props) {
    super(props);
    this.changeRangePosition = this.changeRangePosition.bind(this);
  }

  componentDidMount() {
    const canvas = this.props.canvasRef.current;
    canvas.addEventListener("wheel", event => {
      if (this.props.drawRobotInterval !== undefined) {
        clearInterval(this.props.drawRobotInterval);
        this.props.setDrawRobotInterval(undefined);
      }
      this.props.addToRangePosition(-Math.sign(event.deltaY));
    });
  }

  changeRangePosition(event) {
    this.props.setRangePosition(event.target.value);
  }

  render() {
    return (
      <div className="PlayingBar">
        <Form.Control value={this.props.rangePosition} type="range" 
          onChange={this.changeRangePosition} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    drawRobotInterval: state.drawRobotInterval,
    rangePosition: state.rangePosition,
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