import React from 'react';
import { Form, Col } from 'react-bootstrap';
import SettingsConfig from "./settings-config";
import { PathConfig } from "../../../path-generator/path-generator";

class SettingsPathConfig extends SettingsConfig {
    constructor() {
        super();

        this.pathWidthRef = React.createRef();
        this.robotMaxVRef = React.createRef();
        this.robotMaxAccRef = React.createRef();
        this.robotLoopTimeRef = React.createRef();
    }

    getData() {
        return new PathConfig(
            this.pathWidthRef.current.value,
            this.robotMaxVRef.current.value,
            this.robotMaxAccRef.current.value,
            Number(this.robotLoopTimeRef.current.value),
        );
    }

    render(props) {
        return (
            <div>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label style={this.style}> Path config: </Form.Label>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Width</Form.Label>
                        <Form.Control type="number" ref={this.pathWidthRef}
                            defaultValue={props.pathConfig.width} />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Max V</Form.Label>
                        <Form.Control type="number" ref={this.robotMaxVRef}
                            defaultValue={props.pathConfig.vMax} />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Max Acc</Form.Label>
                        <Form.Control type="number" ref={this.robotMaxAccRef}
                            defaultValue={props.pathConfig.acc} />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Loop time</Form.Label>
                        <Form.Control type="number" ref={this.robotLoopTimeRef}
                            defaultValue={props.pathConfig.robotLoopTime} />
                    </Form.Group>
                </Form.Row>
            </div>
        );
    }
}

export default SettingsPathConfig;