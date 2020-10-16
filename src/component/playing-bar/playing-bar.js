import React from 'react';
import { connect } from 'react-redux';
import { Form } from "react-bootstrap";
import { setRangePosition, addToRangePosition } from "./playing-bar-action";

class PlayingBar extends React.Component {
  constructor(props) {
    super(props);
    this.changeRangePosition = this.changeRangePosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener("wheel", event => {
      this.props.addToRangePosition(-Math.sign(event.deltaY));
    });
  }

  changeRangePosition(event){
    this.props.setRangePosition(event.target.value);
  }

  render() {
    return (
      <div className="PlayingBar">
        <Form.Control value={this.props.rangePosition} type="range" ref={this.rangeInput}
          onChange={this.changeRangePosition} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rangePosition: state.rangePosition,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRangePosition: rangePosition => dispatch(setRangePosition(rangePosition)),
    addToRangePosition: add => dispatch(addToRangePosition(add)),
  };
}

const playingBar = connect(mapStateToProps, mapDispatchToProps)(PlayingBar);
export default playingBar;