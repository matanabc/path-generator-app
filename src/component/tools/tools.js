import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Dropdown } from 'react-bootstrap';
import { GiClick } from "react-icons/gi";
import { MdBuild, MdDelete, MdEdit, MdPlayArrow, MdPause, MdReplay } from "react-icons/md";
import { FiDownload, FiCircle, FiCheckCircle } from "react-icons/fi";
import { savePathToCSV } from "../..//handlers/project-handler";
import { addToRangePosition, setRangePosition } from "../playing-bar/playing-bar-action";
import { changePopupStatus } from "../popups/popups-action";
import {
  changeSelectedPath, changeListenToMouseStatus, isPathInReverse, setDrawRobotInterval
} from "./tools-action";

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.saveToCSV = this.saveToCSV.bind(this);
    this.setDrawRobotInterval = this.setDrawRobotInterval.bind(this);
    this.drawRobotInterval = this.drawRobotInterval.bind(this);
  }

  saveToCSV() {
    if (this.props.paths.length > 0 && this.props.paths[this.props.pathID].waypoints.length > 0)
      savePathToCSV(this.props.saveCSVTo, this.props.path,
        this.props.paths[this.props.pathID].name,
        this.props.paths[this.props.pathID].isInReverse,
        this.props.showSavePathCSVPopup);
  }

  drawRobotInterval() {
    if (this.props.rangePosition === this.props.path.sourceSetpoints.length - 1)
      this.props.setDrawRobotInterval(this.props.robotDrawConfig.drawRobotInterval);
    else
      this.props.addToRangePosition();
  }

  setDrawRobotInterval() {
    if (!this.props.path) return;
    if (!this.props.path.isLegal) return;
    this.props.setDrawRobotInterval(
      this.props.robotDrawConfig.drawRobotInterval,
      this.drawRobotInterval,
      this.props.pathConfig.robotLoopTime
    );
  }

  render() {
    var playButtonToShow = <MdPlayArrow />;
    if (this.props.robotDrawConfig.drawRobotInterval)
      playButtonToShow = <MdPause />;
    else if ((this.props.path) &&
      (this.props.rangePosition === this.props.path.sourceSetpoints.length - 1))
      playButtonToShow = <MdReplay />;

    return (
      <div className="Tools">
        <Row>
          <Col>
            <Button className="mr-3" size="lg" title="Add waypoint with mouse"
              variant={this.props.listenToMouseClicks ? "success" : "primary"}
              onClick={this.props.changeListenToMouseStatus}>
              <GiClick />
            </Button>
            <Button className="mr-3" size="lg" title="Save csv path to robot"
              onClick={this.saveToCSV}>
              <FiDownload />
            </Button>
            <Button className="mr-3" size="lg" title="Settings"
              onClick={this.props.showSettingsPopup}>
              <MdBuild />
            </Button>
          </Col>
          <Dropdown>
            <Dropdown.Toggle size="lg">
              {this.props.paths.length > 0 ? this.props.paths[this.props.pathID].name : "There is no path"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.props.paths.map((element, index) => {
                if (this.props.paths[this.props.pathID].name === element.name)
                  return <Dropdown.Item as="button" key={index} active>
                    <span size="lg">{element.name}</span>
                  </Dropdown.Item>
                return <Dropdown.Item as="button" key={index} onClick={() => {
                  this.props.changeSelectedPath(index)
                }}> {element.name} </Dropdown.Item>
              })}
              <Dropdown.Divider />
              <Dropdown.Item as="button" className="AddPath"
                onClick={this.props.showCreateNewPathPopup}>
                New path
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="mr-3 ml-4" size="lg" onClick={this.setDrawRobotInterval}>
            {playButtonToShow}
          </Button>
          <Button className="mr-3" size="lg" title="Delete path" variant="danger"
            onClick={this.props.showDeletePathPopup}>
            <MdDelete />
          </Button>
          <Button className="mr-3" size="lg" title="Rename path"
            onClick={this.props.showRenamePathPopup}>
            <MdEdit />
          </Button>
          <Button className="mr-3" size="lg" onClick={this.props.isPathInReverse}>
            {this.props.paths.length > 0 && this.props.paths[this.props.pathID].isInReverse ?
              <FiCheckCircle className="mr-2" /> : <FiCircle className="mr-2" />}
            in reverse
          </Button>
        </Row>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listenToMouseClicks: state.listenToMouseClicks,
    robotDrawConfig: state.robotDrawConfig,
    showDeletePath: state.showDeletePath,
    rangePosition: state.rangePosition,
    createNewPath: state.createNewPath,
    pathConfig: state.pathConfig,
    saveCSVTo: state.saveCSVTo,
    update: state.update,
    pathID: state.pathID,
    paths: state.paths,
    path: state.path,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDrawRobotInterval: (interval, drawRobotInterval, robotLoopTime) => {
      dispatch(setDrawRobotInterval(interval, drawRobotInterval, robotLoopTime));
    },
    showCreateNewPathPopup: () => dispatch(changePopupStatus("createNewPathPopup")),
    showSavePathCSVPopup: () => dispatch(changePopupStatus("savePathCSVPopup")),
    showRenamePathPopup: () => dispatch(changePopupStatus("renamePathPopup")),
    showDeletePathPopup: () => dispatch(changePopupStatus("deletePathPopup")),
    showSettingsPopup: () => dispatch(changePopupStatus("settingsPopup")),
    changeListenToMouseStatus: () => dispatch(changeListenToMouseStatus()),
    changeSelectedPath: id => dispatch(changeSelectedPath(id)),
    addToRangePosition: () => dispatch(addToRangePosition(1)),
    resetRangePosition: () => dispatch(setRangePosition(0)),
    isPathInReverse: () => dispatch(isPathInReverse()),
  };
}

const tools = connect(mapStateToProps, mapDispatchToProps)(Tools);
export default tools;