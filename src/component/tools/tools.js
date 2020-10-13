import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Dropdown } from 'react-bootstrap';
import { GiClick } from "react-icons/gi";
import { MdBuild, MdDelete, MdEdit } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { openSettings, changeSelectedPath, changeListenToMouseStatus } from "./tools-action";

class Tools extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Tools">
        <Row>
          <Col>
            <Button className="mr-3" size="lg" title="Add waypoint with mouse"
              variant={this.props.listenToMouseClicks ? "success" : "primary"}
              onClick={this.props.changeListenToMouseStatus}>
              <GiClick />
            </Button>
            <Button className="mr-3" size="lg" title="Save csv path to robot" disabled>
              <FiDownload />
            </Button>
            <Button className="mr-3" size="lg" title="Settings"
              onClick={this.props.openSettings}>
              <MdBuild />
            </Button>
          </Col>
          <Dropdown>
            <Dropdown.Toggle size="lg">
              {this.props.paths.length > 0 ? this.props.paths[this.props.pathID].name : ""}
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
              <Dropdown.Item as="button" className="AddPath">
                New path
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="mr-3 ml-4" size="lg" title="Delete path" variant="danger" disabled>
            <MdDelete />
          </Button>
          <Button className="mr-3" size="lg" title="Rename path" disabled>
            <MdEdit />
          </Button>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    paths: state.paths,
    pathID: state.pathID,
    listenToMouseClicks: state.listenToMouseClicks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSettings: () => dispatch(openSettings()),
    changeSelectedPath: (id) => dispatch(changeSelectedPath(id)),
    changeListenToMouseStatus: () => dispatch(changeListenToMouseStatus()),
  };
}

const tools = connect(mapStateToProps, mapDispatchToProps)(Tools);
export default tools;