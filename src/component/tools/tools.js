import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Dropdown } from 'react-bootstrap';
import { GiClick } from "react-icons/gi";
import { MdBuild, MdDelete, MdEdit } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { saveCSV } from "../../FileHandler";
import RenamePath from '../rename-path/rename-path'
import Settings from '../settings/settings'
import {
  openSettings, changeSelectedPath, changeListenToMouseStatus, renamePath
} from "./tools-action";

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.saveToCSV = this.saveToCSV.bind(this);
  }

  saveToCSV() {
    saveCSV(this.props.path, this.props.paths[this.props.pathID].name);
  }

  render() {
    return (
      <div className="Tools">
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
              {this.props.paths ? this.props.paths[this.props.pathID].name : ""}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.props.paths ? this.props.paths.map((element, index) => {
                if (this.props.paths[this.props.pathID].name === element.name)
                  return <Dropdown.Item as="button" key={index} active>
                    <span size="lg">{element.name}</span>
                  </Dropdown.Item>
                return <Dropdown.Item as="button" key={index} onClick={() => {
                  this.props.changeSelectedPath(index)
                }}> {element.name} </Dropdown.Item>
              }) : <span />}
              <Dropdown.Divider />
              <Dropdown.Item as="button" className="AddPath">
                New path
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="mr-3 ml-4" size="lg" title="Delete path" variant="danger" disabled>
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
    paths: state.paths,
    path: state.path,
    pathID: state.pathID,
    listenToMouseClicks: state.listenToMouseClicks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSettings: () => dispatch(openSettings()),
    changeSelectedPath: (id) => dispatch(changeSelectedPath(id)),
    changeListenToMouseStatus: () => dispatch(changeListenToMouseStatus()),
    renamePath: () => dispatch(renamePath()),
  };
}

const tools = connect(mapStateToProps, mapDispatchToProps)(Tools);
export default tools;