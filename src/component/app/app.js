import React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import WaypointsView from '../waypoints-view/waypoints-view';
import FieldView from '../field-view/field-view';
import Tools from '../tools/tools';
import { setFiledImage, addPath, setProjectSettings, setProjectFolderPath, newVersion } from './app-action'
import { loadProjectFile } from "../..//handlers/project-handler";
import Popups from "../popups/popups";
import { onNewVersion } from "../../handlers/electron-handler";

class App extends React.Component {
  componentDidMount() {
    loadProjectFile(this.props.setProjectSettings, this.props.setProjectFolderPath,
      this.props.setFiledImage, this.props.addPath);
    onNewVersion(this.props.newVersion);
  }

  render() {
    return (
      <div className="App">
        <Popups />
        <Container fluid="md">
          <Row >
            <FieldView />
          </Row>
          <Row>
            <Tools />
          </Row>
          <Row>
            <WaypointsView />
          </Row>
        </Container>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProjectFolderPath: projectFolderPath => dispatch(setProjectFolderPath(projectFolderPath)),
    setFiledImage: (filedImage, imageName) => dispatch(setFiledImage(filedImage, imageName)),
    setProjectSettings: settings => dispatch(setProjectSettings(settings)),
    newVersion: version => dispatch(newVersion(version)), 
    addPath: path => dispatch(addPath(path)),
  };
}

const app = connect(mapStateToProps, mapDispatchToProps)(App);
export default app;
