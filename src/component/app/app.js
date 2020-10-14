import React from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import WaypointsView from '../waypoints-view/waypoints-view';
import FieldView from '../field-view/field-view';
import Tools from '../tools/tools';
import { loadCookies } from '../../CookieHandler'
import { loadCookiesToState } from './app-action'

class App extends React.Component {
  componentDidMount() {
    loadCookies(this.props.loadCookiesToState);
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
    loadCookiesToState: (robotConfig, paths, filedConfig) =>
      dispatch(loadCookiesToState(robotConfig, paths, filedConfig)),
  };
}

const app = connect(mapStateToProps, mapDispatchToProps)(App);
export default app;
