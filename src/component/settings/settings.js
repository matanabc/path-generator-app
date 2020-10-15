import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { closeSettings, setSettings } from './settings-action';
import RobotConfig from '../../path-generator/robot-config';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.saveSettings = this.saveSettings.bind(this);
        this.projectFolderInput = React.createRef();
        this.robotCSVFolderInput = React.createRef();
        this.robotWidthInput = React.createRef();
        this.robotMaxVInput = React.createRef();
        this.robotMaxAccInput = React.createRef();
        this.filedImageNameInput = React.createRef();
        this.fieldWidthInput = React.createRef();
        this.fieldHeightInput = React.createRef();
    }

    saveSettings() {
        const robotConfig = new RobotConfig(
            this.robotWidthInput.current.value,
            this.robotMaxVInput.current.value,
            this.robotMaxAccInput.current.value,
        );

        const filedInfo = {
            fieldWidth: this.fieldWidthInput.current.value,
            fieldHeight: this.fieldHeightInput.current.value,
            x_min: 130,
            x_max: 754,
            y_min: 20,
            y_max: 440,
        };

        filedInfo.widthMeterToPixel = (filedInfo.fieldWidth) / (filedInfo.x_max - filedInfo.x_min);
        filedInfo.hightMeterToPixel = (filedInfo.fieldHeight) / (filedInfo.y_max - filedInfo.y_min);

        const settings = {
            projectPath: this.projectFolderInput.current.value,
            saveCSVTo: this.robotCSVFolderInput.current.value,
            filedImageName: this.filedImageNameInput.current.value,
            filedInfo: filedInfo,
            robotConfig: robotConfig,
        };

        this.props.setSettings(settings);
    }

    render() {
        return (
            <Modal show={this.props.projectPath === undefined || this.props.showSettings}
                onHide={this.props.closeSettings} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Project folder</Form.Label>
                            <Form.Control defaultValue={this.props.projectPath ? this.props.projectPath : ""}
                                ref={this.projectFolderInput} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Robot CSV folder</Form.Label>
                            <Form.Control defaultValue={this.props.saveCSVTo ? this.props.saveCSVTo : ""}
                                ref={this.robotCSVFolderInput} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Robot width</Form.Label>
                            <Form.Control type="number" ref={this.robotWidthInput}
                                defaultValue={this.props.filedInfo ? this.props.robotConfig.width : 0} />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Robot max V</Form.Label>
                            <Form.Control type="number" ref={this.robotMaxVInput}
                                defaultValue={this.props.filedInfo ? this.props.robotConfig.vMax : 0} />
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Robot max Acc</Form.Label>
                            <Form.Control type="number" ref={this.robotMaxAccInput}
                                defaultValue={this.props.filedInfo ? this.props.robotConfig.acc : 0} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Filed image name</Form.Label>
                            <Form.Control defaultValue={this.props.filedImageName} ref={this.filedImageNameInput} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Field width</Form.Label>
                            <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.fieldWidth : 0}
                                ref={this.fieldWidthInput} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Field height</Form.Label>
                            <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.fieldHeight : 0}
                                ref={this.fieldHeightInput} />
                        </Form.Group>
                    </Form.Row>
                    <OverlayTrigger overlay={<Tooltip>Set filed image size</Tooltip>}>
                        <Button variant="primary" block disabled>
                            <MdPhotoSizeSelectLarge />
                        </Button>
                    </OverlayTrigger>
                </Modal.Body >
                <Modal.Footer >
                    <Button variant="outline-primary" onClick={this.props.closeSettings}>cancel</Button>
                    <Button onClick={this.saveSettings}>save</Button>
                </Modal.Footer>
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
        setSettings: settings => dispatch(setSettings(settings)),
        closeSettings: () => dispatch(closeSettings()),
    };
}

const settings = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default settings;
