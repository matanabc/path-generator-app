import React from 'react';
import { Form, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import SettingsConfig from "./settings-config";
import { RobotDrawConfig } from "../../field-view/field-view-config";

class SettingsRobotConfig extends SettingsConfig {
    constructor() {
        super();

        this.robotWidthRef = React.createRef();
        this.robotLengthRef = React.createRef();
        this.robotCenterRef = React.createRef();
    }

    getData() {
        return new RobotDrawConfig(
            this.robotWidthRef.current.value,
            this.robotLengthRef.current.value,
            this.robotCenterRef.current.value,
        );
    }

    render(props) {
        return (
            <div>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label style={this.style}> Robot config: </Form.Label>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="4">
                        <OverlayTrigger overlay={
                            <Tooltip> with bumper </Tooltip>
                        }>
                            <Form.Label>Width</Form.Label>
                        </OverlayTrigger>
                        <Form.Control type="number" ref={this.robotWidthRef}
                            defaultValue={props.robotDrawConfig.width}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <OverlayTrigger overlay={
                            <Tooltip> with bumper </Tooltip>
                        }>
                            <Form.Label>Length</Form.Label>
                        </OverlayTrigger>
                        <Form.Control type="number" ref={this.robotLengthRef}
                            defaultValue={props.robotDrawConfig.length}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <OverlayTrigger overlay={
                            <Tooltip>
                                <span style={{ color: "red" }}>back</span> {" (-) < "}
                                <span style={{ color: "rgb(50, 100, 0)" }}> center </span>
                                {" < (+) "} <span style={{ color: "blue" }}>front</span>
                            </Tooltip>
                        }>
                            <Form.Label>Center</Form.Label>
                        </OverlayTrigger>
                        <Form.Control type="number" ref={this.robotCenterRef}
                            defaultValue={props.robotDrawConfig.center}
                        />
                    </Form.Group>
                </Form.Row>
            </div>
        );
    }
}

export default SettingsRobotConfig;