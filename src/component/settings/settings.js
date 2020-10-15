import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col, Tooltip, OverlayTrigger, Row } from 'react-bootstrap';
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { FiUpload, FiDownload } from "react-icons/fi";
import { closeSettings, setRobotVMax, setRobotAcc, setRobotWidth } from './settings-action'
import { saveProjectFile } from "../../FileHandler";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.updateRobotVMax = this.updateRobotVMax.bind(this);
        this.updateRobotAcc = this.updateRobotAcc.bind(this);
        this.updateRobotWidth = this.updateRobotWidth.bind(this);
        this.imageFile = this.imageFile.bind(this);
        this.saveProjectFile = this.saveProjectFile.bind(this);
    }

    saveProjectFile() {
        const projectFile = {
            paths: this.props.paths,
            robotConfig: this.props.robotConfig,
            filedInfo: this.props.filedInfo
        };
        saveProjectFile(projectFile);
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

    imageFile(event) {
        const file = URL.createObjectURL(event.target.files[0]);
        console.log(file);
    }

    render() {
        return (
            <Modal show={this.props.showSettings} onHide={this.props.closeSettings}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.File label="App config file to load" custom onChange={this.imageFile} disabled />
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Field width</Form.Label>
                            <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.fieldWidth : 0}
                                onChange={this.updateFieldWidth} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Field hight</Form.Label>
                            <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.fieldHeight : 0}
                                onChange={this.updateFieldHeight} disabled />
                        </Form.Group>
                    </Form.Row>
                    <OverlayTrigger overlay={<Tooltip>Set filed image size</Tooltip>}>
                        <Button variant="primary" block disabled>
                            <MdPhotoSizeSelectLarge />
                        </Button>
                    </OverlayTrigger>
                    <Form.Row>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Robot width</Form.Label>
                            <Form.Control type="number" onChange={this.updateRobotWidth}
                                defaultValue={this.props.filedInfo ? this.props.robotConfig.width : 0} />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Robot max V</Form.Label>
                            <Form.Control type="number" onChange={this.updateRobotVMax}
                                defaultValue={this.props.filedInfo ? this.props.robotConfig.vMax : 0} />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Robot max Acc</Form.Label>
                            <Form.Control type="number" onChange={this.updateRobotAcc}
                                defaultValue={this.props.filedInfo ? this.props.robotConfig.acc : 0} />
                        </Form.Group>
                    </Form.Row>
                    <Row>
                        <Col>
                            <OverlayTrigger overlay={<Tooltip>Save project file</Tooltip>}>
                                <Button variant="primary" block onClick={this.saveProjectFile}>
                                    <FiDownload />
                                </Button>
                            </OverlayTrigger>
                        </Col>
                        <Col>
                            <OverlayTrigger overlay={<Tooltip>Load project file</Tooltip>}>
                                <Button variant="primary" block disabled>
                                    <FiUpload />
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
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
        paths: state.paths,
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
