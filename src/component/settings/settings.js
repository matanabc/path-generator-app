import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { closeSettings, setRobotVMax, setRobotAcc, setRobotWidth } from './settings-action'

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.updateRobotVMax = this.updateRobotVMax.bind(this);
        this.updateRobotAcc = this.updateRobotAcc.bind(this);
        this.updateRobotWidth = this.updateRobotWidth.bind(this);
    }

    updateRobotVMax(event) {
        this.props.setRobotVMax(this.props.robotConfig, event.target.value);
    }

    updateRobotAcc(event) {
        this.props.setRobotAcc(this.props.robotConfig, event.target.value);
    }

    updateRobotWidth(event) {
        this.props.setRobotWidth(this.props.robotConfig, event.target.value);
    }

    render() {
        return (
            <Modal show={this.props.showSettings} onHide={this.props.closeSettings}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.File label="App config file to load" custom disabled/>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Field width</Form.Label>
                            <Form.Control defaultValue={this.props.filedInfo.fieldWidth}
                                onChange={this.updateFieldWidth} disabled/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Field hight</Form.Label>
                            <Form.Control defaultValue={this.props.filedInfo.fieldHeight}
                                onChange={this.updateFieldHeight} disabled/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Robot width</Form.Label>
                            <Form.Control type="number" defaultValue={this.props.robotConfig.width}
                                onChange={this.updateRobotWidth} />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Robot max V</Form.Label>
                            <Form.Control type="number" defaultValue={this.props.robotConfig.vMax}
                                onChange={this.updateRobotVMax} />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Robot max Acc</Form.Label>
                            <Form.Control type="number" defaultValue={this.props.robotConfig.acc}
                                onChange={this.updateRobotAcc} />
                        </Form.Group>
                    </Form.Row>
                    <OverlayTrigger overlay={<Tooltip>Set filed image size</Tooltip>}>
                        <Button variant="primary" block disabled>
                            <MdPhotoSizeSelectLarge />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Save settings file</Tooltip>}>
                        <Button variant="primary" block disabled>
                            <FiUpload />
                        </Button>
                    </OverlayTrigger>
                </Modal.Body >
            </Modal >
        );
    };
}

const mapStateToProps = (state) => {
    return {
        showSettings: state.showSettings,
        robotConfig: state.robotConfig,
        filedInfo: state.filedInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeSettings: () => dispatch(closeSettings()),
        setRobotVMax: (robotConfig, vMax) => dispatch(setRobotVMax(robotConfig, vMax)),
        setRobotAcc: (robotConfig, acc) => dispatch(setRobotAcc(robotConfig, acc)),
        setRobotWidth: (robotConfig, width) => dispatch(setRobotWidth(robotConfig, width)),
    };
}

const settings = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default settings;
