import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { setSettings } from './settings-action';
import { PathConfig } from '../../path-generator/path-generator';
import { FieldConfig } from "../field-view/field-view-config";
import { changePopupStatus } from "../popups/popups-action";
import { RobotDrawConfig } from "../field-view/field-view-config";
import { loadFieldImage } from "../..//handlers/project-handler";
import { loadProjectFile } from "../..//handlers/project-handler";
import { setFiledImage, addPath, setProjectSettings, setProjectFolderPath } from '../app/app-action';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.saveSettings = this.saveSettings.bind(this);
        this.robotCSVFolderInput = React.createRef();
        this.projectFolderInput = React.createRef();
        this.pathWidthInput = React.createRef();
        this.robotMaxVInput = React.createRef();
        this.robotMaxAccInput = React.createRef();
        this.robotLoopTimeInput = React.createRef();
        this.robotWidthInput = React.createRef();
        this.robotLengthInput = React.createRef();
        this.robotCenterInput = React.createRef();
        this.filedImageNameInput = React.createRef();
        this.fieldWidthInMeterInput = React.createRef();
        this.fieldHeightInMeterInput = React.createRef();
        this.fieldTopLeftXInput = React.createRef();
        this.fieldTopLeftYInput = React.createRef();
        this.fieldWidthInPixelInput = React.createRef();
        this.fieldHeightInPixelInput = React.createRef();
    }

    saveSettings() {
        const pathConfig = new PathConfig(
            this.pathWidthInput.current.value,
            this.robotMaxVInput.current.value,
            this.robotMaxAccInput.current.value,
            Number(this.robotLoopTimeInput.current.value),
        );

        const fieldConfig = new FieldConfig(
            this.filedImageNameInput.current.value,
            this.fieldWidthInMeterInput.current.value,
            this.fieldHeightInMeterInput.current.value,
            this.fieldTopLeftXInput.current.value,
            this.fieldTopLeftYInput.current.value,
            this.fieldWidthInPixelInput.current.value,
            this.fieldHeightInPixelInput.current.value,
        );

        const robotDrawConfig = new RobotDrawConfig(
            this.robotWidthInput.current.value,
            this.robotLengthInput.current.value,
            this.robotCenterInput.current.value,
        );

        const settings = {
            projectPath: this.projectFolderInput.current.value,
            saveCSVTo: this.robotCSVFolderInput.current.value,
            robotDrawConfig: robotDrawConfig,
            fieldConfig: fieldConfig,
            pathConfig: pathConfig,
        };

        this.props.setSettings(settings);
        if (settings.projectPath !== this.props.projectPath)
            loadProjectFile(this.props.setProjectSettings, this.props.setProjectFolderPath,
                this.props.setFiledImage, this.props.addPath);
        if (fieldConfig.imageName !== this.props.fieldConfig.imageName)
            loadFieldImage(this.props.projectPath, fieldConfig.imageName, this.props.setFiledImage);
    }

    render() {
        const style = { fontSize: 20, fontWeight: "bold" };
        const fieldConfig = this.props.fieldConfig;
        return (
            <Modal show={this.props.projectPath === undefined || this.props.popupsStatus.settingsPopup}
                onHide={this.props.closeSettings} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="SettingsBody ml-1">
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={style}> Folders config: </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Project folder</Form.Label>
                                <Form.Control defaultValue={this.props.projectPath}
                                    ref={this.projectFolderInput}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Paths CSV folder</Form.Label>
                                <Form.Control defaultValue={this.props.saveCSVTo}
                                    ref={this.robotCSVFolderInput}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={style}> Path config: </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Width</Form.Label>
                                <Form.Control type="number" ref={this.pathWidthInput}
                                    defaultValue={this.props.pathConfig.width} />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Max V</Form.Label>
                                <Form.Control type="number" ref={this.robotMaxVInput}
                                    defaultValue={this.props.pathConfig.vMax} />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Max Acc</Form.Label>
                                <Form.Control type="number" ref={this.robotMaxAccInput}
                                    defaultValue={this.props.pathConfig.acc} />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Loop time</Form.Label>
                                <Form.Control type="number" ref={this.robotLoopTimeInput}
                                    defaultValue={this.props.pathConfig.robotLoopTime} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={style}> Robot config: </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <OverlayTrigger overlay={<Tooltip> with bumper </Tooltip>}>
                                    <Form.Label>Width</Form.Label>
                                </OverlayTrigger>
                                <Form.Control type="number" ref={this.robotWidthInput}
                                    defaultValue={this.props.robotDrawConfig.width}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <OverlayTrigger overlay={<Tooltip> with bumper </Tooltip>}>
                                    <Form.Label>Length</Form.Label>
                                </OverlayTrigger>
                                <Form.Control type="number" ref={this.robotLengthInput}
                                    defaultValue={this.props.robotDrawConfig.length}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <OverlayTrigger overlay={
                                    <Tooltip>
                                        <span style={{ color: "red" }}> back </span> {" < "}
                                        <span style={{ color: "rgb(50, 100, 0)" }}> center </span>
                                        {" < "} <span style={{ color: "blue" }}> front </span>
                                    </Tooltip>
                                }>
                                    <Form.Label>Center</Form.Label>
                                </OverlayTrigger>
                                <Form.Control type="number" ref={this.robotCenterInput}
                                    defaultValue={this.props.robotDrawConfig.center}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={style}> Filed config: </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Image name</Form.Label>
                                <Form.Control defaultValue={fieldConfig.imageName}
                                    ref={this.filedImageNameInput}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Width in meter</Form.Label>
                                <Form.Control defaultValue={fieldConfig.widthInMeter}
                                    ref={this.fieldWidthInMeterInput} type="number"
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Height in meter</Form.Label>
                                <Form.Control defaultValue={fieldConfig.heightInMeter}
                                    ref={this.fieldHeightInMeterInput} type="number"
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Top left x</Form.Label>
                                <Form.Control defaultValue={fieldConfig.topLeftXPixel}
                                    ref={this.fieldTopLeftXInput} type="number"
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Top left y</Form.Label>
                                <Form.Control defaultValue={fieldConfig.topLeftYPixel}
                                    ref={this.fieldTopLeftYInput} type="number"
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Width in pixel</Form.Label>
                                <Form.Control defaultValue={fieldConfig.widthInPixel}
                                    ref={this.fieldWidthInPixelInput} type="number"
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Heigth in pixel</Form.Label>
                                <Form.Control defaultValue={fieldConfig.heigthInPixel}
                                    ref={this.fieldHeightInPixelInput} type="number"
                                />
                            </Form.Group>
                        </Form.Row>

                        <div style={{fontSize:10}}>v{this.props.version}</div>
                    </div>
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
        robotDrawConfig: state.robotDrawConfig,
        popupsStatus: state.popupsStatus,
        projectPath: state.projectPath,
        pathConfig: state.pathConfig,
        fieldConfig: state.fieldConfig,
        saveCSVTo: state.saveCSVTo,
        version: state.version,
        paths: state.paths,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProjectFolderPath: projectFolderPath => dispatch(setProjectFolderPath(projectFolderPath)),
        setFiledImage: (filedImage, imageName) => dispatch(setFiledImage(filedImage, imageName)),
        setProjectSettings: settings => dispatch(setProjectSettings(settings)),
        closeSettings: () => dispatch(changePopupStatus("settingsPopup")),
        setSettings: settings => dispatch(setSettings(settings)),
        addPath: path => dispatch(addPath(path)),
    };
}

const settings = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default settings;
