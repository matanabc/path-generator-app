import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Dropdown, FormControl } from 'react-bootstrap';
import { GiClick } from "react-icons/gi";
import { MdBuild, MdDelete, MdEdit, MdPlayArrow, MdPause } from "react-icons/md";
import { FiDownload, FiCircle, FiCheckCircle } from "react-icons/fi";
import { savePathToCSV } from "../../ProjectHandler";
import Settings from '../settings/settings'
import Popup from "../popup/popup";
import { addToRangePosition } from "../playing-bar/playing-bar-action";
import {
  openSettings, changeSelectedPath, changeListenToMouseStatus, changeShowRenamePathPopup,
  changeShowDeletePathStatus, deletePath, changeShowCreateNewPathStatus, isPathInReverse,
  createPath, changePathName, setDrawRobotInterval
} from "./tools-action";

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.saveToCSV = this.saveToCSV.bind(this);
    this.createNewPath = this.createNewPath.bind(this);
    this.renamePath = this.renamePath.bind(this);
    this.newPathInput = React.createRef();
    this.renamePathInput = React.createRef();
    this.setDrawRobotInterval = this.setDrawRobotInterval.bind(this);
    this.drawRobotInterval = this.drawRobotInterval.bind(this);
  }

  saveToCSV() {
    if (this.props.paths.length > 0 && this.props.paths[this.props.pathID].waypoints.length > 0)
      savePathToCSV(this.props.saveCSVTo, this.props.path, this.props.paths[this.props.pathID].name,
        this.props.paths[this.props.pathID].isInReverse);
  }

  createNewPath() {
    if (this.newPathInput.current.value)
      this.props.createPath(this.newPathInput.current.value);
  }

  renamePath() {
    if (this.renamePathInput.current.value)
      this.props.changePathName(this.renamePathInput.current.value);
  }

  drawRobotInterval() {
    if (this.props.rangePosition === 100) {
      clearInterval(this.props.drawRobotInterval);
      this.props.setDrawRobotInterval(undefined);
    }
    else
      this.props.addToRangePosition();
  }

  setDrawRobotInterval() {
    var drawRobotInterval = undefined;
    if (this.props.drawRobotInterval === undefined) {
      drawRobotInterval = setInterval(this.drawRobotInterval,
        1000 * this.props.robotConfig.robotLoopTime);
    } else {
      clearInterval(this.props.drawRobotInterval);
    }
    this.props.setDrawRobotInterval(drawRobotInterval);
  }

  render() {
    return (
      <div className="Tools">
        <Popup show={this.props.showDeletePath && this.props.paths.length > 0}
          close={this.props.changeShowDeletePathStatus} confirm={this.props.deletePath}
          title="Delete path" body="Are you sure you want to delete path?" />

        <Popup body={<FormControl ref={this.renamePathInput}
          defaultValue={this.props.paths.length > 0 ? this.props.paths[this.props.pathID].name : ""} />}
          confirm={this.renamePath} close={this.props.changeShowRenamePathPopup}
          show={this.props.showRenamePathPopup && this.props.paths.length > 0}
          title="Rename path" />

        <Popup show={this.props.createNewPath} confirm={this.createNewPath}
          close={this.props.changeShowCreateNewPathStatus} title="Create a new path"
          body={<FormControl ref={this.newPathInput} placeholder="Path name" />} />

        <Settings />
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
              onClick={this.props.openSettings}>
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
                onClick={this.props.changeShowCreateNewPathStatus}>
                New path
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="mr-3 ml-4" size="lg" onClick={this.setDrawRobotInterval}>
            {this.props.drawRobotInterval ? <MdPause /> : <MdPlayArrow />}
          </Button>
          <Button className="mr-3" size="lg" title="Delete path" variant="danger"
            onClick={this.props.changeShowDeletePathStatus}>
            <MdDelete />
          </Button>
          <Button className="mr-3" size="lg" title="Rename path"
            onClick={this.props.changeShowRenamePathPopup}>
            <MdEdit />
          </Button>
          <Button className="mr-3" size="lg" title="Rename path" onClick={this.props.isPathInReverse}>
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
    showRenamePathPopup: state.showRenamePathPopup,
    listenToMouseClicks: state.listenToMouseClicks,
    drawRobotInterval: state.drawRobotInterval,
    showDeletePath: state.showDeletePath,
    rangePosition: state.rangePosition,
    createNewPath: state.createNewPath,
    robotConfig: state.robotConfig,
    saveCSVTo: state.saveCSVTo,
    pathID: state.pathID,
    paths: state.paths,
    path: state.path,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeShowCreateNewPathStatus: () => dispatch(changeShowCreateNewPathStatus()),
    setDrawRobotInterval: (interval) => dispatch(setDrawRobotInterval(interval)),
    changeShowDeletePathStatus: () => dispatch(changeShowDeletePathStatus()),
    changeListenToMouseStatus: () => dispatch(changeListenToMouseStatus()),
    changeShowRenamePathPopup: () => dispatch(changeShowRenamePathPopup()),
    changeSelectedPath: id => dispatch(changeSelectedPath(id)),
    addToRangePosition: () => dispatch(addToRangePosition(1)),
    changePathName: name => dispatch(changePathName(name)),
    isPathInReverse: () => dispatch(isPathInReverse()),
    createPath: name => dispatch(createPath(name)),
    openSettings: () => dispatch(openSettings()),
    deletePath: () => dispatch(deletePath()),
  };
}

const tools = connect(mapStateToProps, mapDispatchToProps)(Tools);
export default tools;