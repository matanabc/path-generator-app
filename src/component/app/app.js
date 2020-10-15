import React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import WaypointsView from '../waypoints-view/waypoints-view';
import FieldView from '../field-view/field-view';
import Tools from '../tools/tools';
import { setFiledImage, addPath, setProjectSettings, setProjectFolderPath } from './app-action'
import { loadProjectFile } from "../../ProjectHandler";

class App extends React.Component {
  componentDidMount() {
    loadProjectFile(this.props.setProjectSettings, this.props.setProjectFolderPath,
      this.props.setFiledImage, this.props.addPath);
  }

  render() {
    return (
      <div className="App">
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
    addPath: path => dispatch(addPath(path)),
  };
}

const app = connect(mapStateToProps, mapDispatchToProps)(App);
export default app;
