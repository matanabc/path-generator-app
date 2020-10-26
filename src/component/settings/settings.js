import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { closeSettings, setSettings } from './settings-action';
import { PathConfig } from '../../path-generator/path-generator';
import { FieldConfig } from "../field-view/field-view-config";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.saveSettings = this.saveSettings.bind(this);
        this.robotCSVFolderInput = React.createRef();
        this.robotWidthInput = React.createRef();
        this.robotMaxVInput = React.createRef();
        this.robotMaxAccInput = React.createRef();
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
            this.robotWidthInput.current.value,
            this.robotMaxVInput.current.value,
            this.robotMaxAccInput.current.value,
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

        const settings = {
            projectPath: this.props.projectPath,
            saveCSVTo: this.robotCSVFolderInput.current.value,
            fieldConfig: fieldConfig,
            pathConfig: pathConfig,
        };

        this.props.setSettings(settings);
    }

    render() {
        const style = { fontSize: 20, fontWeight: "bold" };
        const fieldConfig = this.props.fieldConfig;
        return (
            <Modal show={this.props.projectPath === undefined || this.props.showSettings}
                onHide={this.props.closeSettings} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="SettingsBody ml-1">
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Robot CSV folder</Form.Label>
                                <Form.Control defaultValue={this.props.saveCSVTo ? this.props.saveCSVTo : ""}
                                    ref={this.robotCSVFolderInput} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={style}> Path config: </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Width</Form.Label>
                                <Form.Control type="number" ref={this.robotWidthInput}
                                    defaultValue={this.props.pathConfig ? this.props.pathConfig.width : 0} />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Max V</Form.Label>
                                <Form.Control type="number" ref={this.robotMaxVInput}
                                    defaultValue={this.props.pathConfig ? this.props.pathConfig.vMax : 0} />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Max Acc</Form.Label>
                                <Form.Control type="number" ref={this.robotMaxAccInput}
                                    defaultValue={this.props.pathConfig ? this.props.pathConfig.acc : 0} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={style}> Robot config: </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Width</Form.Label>
                                <Form.Control type="number" disabled />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Length</Form.Label>
                                <Form.Control type="number" disabled />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Center</Form.Label>
                                <Form.Control type="number" disabled />
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
                                <Form.Control defaultValue={fieldConfig.imageName} ref={this.filedImageNameInput} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Width in meter</Form.Label>
                                <Form.Control defaultValue={fieldConfig.widthInMeter}
                                    ref={this.fieldWidthInMeterInput} type="number" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Height in meter</Form.Label>
                                <Form.Control defaultValue={fieldConfig.heightInMeter}
                                    ref={this.fieldHeightInMeterInput} type="number" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Top left x pixel</Form.Label>
                                <Form.Control defaultValue={fieldConfig.topLeftXPixel}
                                    ref={this.fieldTopLeftXInput} type="number" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Top left y pixel</Form.Label>
                                <Form.Control defaultValue={fieldConfig.topLeftYPixel}
                                    ref={this.fieldTopLeftYInput} type="number" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Width in pixel</Form.Label>
                                <Form.Control defaultValue={fieldConfig.widthInPixel}
                                    ref={this.fieldWidthInPixelInput} type="number" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Heigth in pixel</Form.Label>
                                <Form.Control defaultValue={fieldConfig.heigthInPixel}
                                    ref={this.fieldHeightInPixelInput} type="number" />
                            </Form.Group>
                        </Form.Row>
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
        showSettings: state.showSettings,
        projectPath: state.projectPath,
        pathConfig: state.pathConfig,
        fieldConfig: state.fieldConfig,
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
