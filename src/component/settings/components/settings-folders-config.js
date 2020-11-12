import SettingsConfig from "./settings-config";
import React from 'react';
import { Form, Col } from 'react-bootstrap';

class SettingsFoldersConfig extends SettingsConfig{
    constructor() {
        super();
        this.projectFolderRef = React.createRef();
        this.CSVFolderRef = React.createRef();
    }

    getData() {
        return {
            projectPath: this.projectFolderRef.current.value,
            saveCSVTo: this.CSVFolderRef.current.value,
        };
    }

    render(props) {
        return (
            <div>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label style={this.style}> Folders config: </Form.Label>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Project folder</Form.Label>
                        <Form.Control defaultValue={props.projectPath} ref={this.projectFolderRef} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Paths CSV folder</Form.Label>
                        <Form.Control defaultValue={props.saveCSVTo} ref={this.CSVFolderRef} />
                    </Form.Group>
                </Form.Row>
            </div>
        );
    }
}

export default SettingsFoldersConfig;