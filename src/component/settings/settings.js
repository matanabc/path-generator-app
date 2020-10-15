import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { closeSettings, setRobotConfig } from './settings-action'

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.updateRobotVMax = this.updateRobotVMax.bind(this);
        this.updateRobotAcc = this.updateRobotAcc.bind(this);
        this.updateRobotWidth = this.updateRobotWidth.bind(this);
    }

    updateRobotVMax(event) {
        this.props.setRobotConfig("vMax", event.target.value);
    }

    updateRobotAcc(event) {
        this.props.setRobotConfig("acc", event.target.value);
    }

    updateRobotWidth(event) {
        this.props.setRobotConfig("width", event.target.value);
    }

    render() {
        return (
            <Modal show={this.props.projectPath === undefined ||
                this.props.showSettings} onHide={this.props.closeSettings}>
                <Modal.Header closeButton>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Project folder</Form.Label>
                            <Form.Control defaultValue={this.props.projectPath ? this.props.projectPath : ""} disabled />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Robot CSV folder</Form.Label>
                            <Form.Control defaultValue={this.props.saveCSVTo ? this.props.saveCSVTo : ""} disabled />
                        </Form.Group>
                    </Form.Row>
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
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Filed image name</Form.Label>
                            <Form.Control defaultValue={this.props.filedImageName} disabled />
                        </Form.Group>
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
                </Modal.Body >
            </Modal >
        );
    };
}

const mapStateToProps = (state) => {
    return {
        filedImageName: state.filedImageName,
        showSettings: state.showSettings,
        projectPath: state.projectPath,
        robotConfig: state.robotConfig,
        filedInfo: state.filedInfo,
        saveCSVTo: state.saveCSVTo,
        paths: state.paths,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRobotConfig: (key, value) => dispatch(setRobotConfig(key, value)),
        closeSettings: () => dispatch(closeSettings()),
    };
}

const settings = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default settings;
