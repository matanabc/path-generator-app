import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { closeSettings, setSettings } from './settings-action';
import RobotConfig from '../../path-generator/robot-config';

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
        const robotConfig = new RobotConfig(
            this.robotWidthInput.current.value,
            this.robotMaxVInput.current.value,
            this.robotMaxAccInput.current.value,
        );

        const filedInfo = {
            topLeftX: Number(this.fieldTopLeftXInput.current.value),
            topLeftY: Number(this.fieldTopLeftYInput.current.value),
            filedWidthInPixel: Number(this.fieldWidthInPixelInput.current.value),
            filedHeigthInPixel: Number(this.fieldHeightInPixelInput.current.value),
            fieldWidthInMeter: Number(this.fieldWidthInMeterInput.current.value),
            fieldHeightInMeter: Number(this.fieldHeightInMeterInput.current.value),
        };

        filedInfo.widthPixelToMeter = (filedInfo.fieldWidthInMeter) / (filedInfo.filedWidthInPixel);
        filedInfo.hightPixelToMeter = (filedInfo.fieldHeightInMeter) / (filedInfo.filedHeigthInPixel);

        const settings = {
            projectPath: this.props.projectPath,
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
                                <Form.Label style={{ fontSize: 20 }}> Path config: </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Width</Form.Label>
                                <Form.Control type="number" ref={this.robotWidthInput}
                                    defaultValue={this.props.filedInfo ? this.props.robotConfig.width : 0} />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Max V</Form.Label>
                                <Form.Control type="number" ref={this.robotMaxVInput}
                                    defaultValue={this.props.filedInfo ? this.props.robotConfig.vMax : 0} />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Max Acc</Form.Label>
                                <Form.Control type="number" ref={this.robotMaxAccInput}
                                    defaultValue={this.props.filedInfo ? this.props.robotConfig.acc : 0} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{ fontSize: 20 }}> Robot config: </Form.Label>
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
                                <Form.Label style={{ fontSize: 20 }}> Filed config: </Form.Label>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Image name</Form.Label>
                                <Form.Control defaultValue={this.props.filedImageName} ref={this.filedImageNameInput} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Width in meter</Form.Label>
                                <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.fieldWidthInMeter : 0}
                                    ref={this.fieldWidthInMeterInput} type="number" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Height in meter</Form.Label>
                                <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.fieldHeightInMeter : 0}
                                    ref={this.fieldHeightInMeterInput} type="number" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Top left x pixel</Form.Label>
                                <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.topLeftX : 0}
                                    ref={this.fieldTopLeftXInput} type="number" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Top left y pixel</Form.Label>
                                <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.topLeftY : 0}
                                    ref={this.fieldTopLeftYInput} type="number" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Width in pixel</Form.Label>
                                <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.filedWidthInPixel : 0}
                                    ref={this.fieldWidthInPixelInput} type="number" />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Heigth in pixel</Form.Label>
                                <Form.Control defaultValue={this.props.filedInfo ? this.props.filedInfo.filedHeigthInPixel : 0}
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
