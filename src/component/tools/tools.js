import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Dropdown, FormControl } from 'react-bootstrap';
import { GiClick } from "react-icons/gi";
import { MdBuild, MdDelete, MdEdit } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { saveCSV } from "../../FileHandler";
import RenamePath from '../rename-path/rename-path'
import Settings from '../settings/settings'
import Popup from "../popup/popup";
import {
  openSettings, changeSelectedPath, changeListenToMouseStatus, renamePath,
  changeShowDeletePathStatus, deletePath, changeShowCreateNewPathStatus,
  createPath
} from "./tools-action";

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.saveToCSV = this.saveToCSV.bind(this);
    this.createNewPath = this.createNewPath.bind(this);
    this.newPathNameInput = React.createRef();
  }

  saveToCSV() {
    saveCSV(this.props.path, this.props.paths[this.props.pathID].name);
  }

  createNewPath() {
    this.props.createPath(this.newPathNameInput.current.value);
  }

  render() {
    return (
      <div className="Tools">
        <Popup show={this.props.showDeletePath && this.props.paths.length > 0}
          close={this.props.changeShowDeletePathStatus} confirm={this.props.deletePath}
          title="Delete path" body="Are you sure you want to delete paht?" />
        <Popup show={this.props.createNewPath} confirm={this.createNewPath}
          close={this.props.changeShowCreateNewPathStatus} title="Create a new path"
          body={<FormControl ref={this.newPathNameInput} placeholder="Path name" />} />
        <RenamePath />
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
              {this.props.paths.length > 0 ? this.props.paths[this.props.pathID].name : "There is no path..."}
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
          <Button className="mr-3 ml-4" size="lg" title="Delete path" variant="danger"
            onClick={this.props.changeShowDeletePathStatus}>
            <MdDelete />
          </Button>
          <Button className="mr-3" size="lg" title="Rename path" onClick={this.props.renamePath}>
            <MdEdit />
          </Button>
          <Button className="mr-3" size="lg" variant="success" disabled>
            in reverse
          </Button>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showDeletePath: state.showDeletePath,
    createNewPath: state.createNewPath,
    paths: state.paths,
    path: state.path,
    pathID: state.pathID,
    listenToMouseClicks: state.listenToMouseClicks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSettings: () => dispatch(openSettings()),
    changeSelectedPath: id => dispatch(changeSelectedPath(id)),
    changeListenToMouseStatus: () => dispatch(changeListenToMouseStatus()),
    renamePath: () => dispatch(renamePath()),
    changeShowDeletePathStatus: () => dispatch(changeShowDeletePathStatus()),
    deletePath: () => dispatch(deletePath()),
    changeShowCreateNewPathStatus: () => dispatch(changeShowCreateNewPathStatus()),
    createPath: name => dispatch(createPath(name)),
  };
}

const tools = connect(mapStateToProps, mapDispatchToProps)(Tools);
export default tools;