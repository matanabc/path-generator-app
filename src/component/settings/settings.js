import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { setSettings } from './settings-action';
import { updateApp } from "../../handlers/electron-handler";
import { changePopupStatus } from "../popups/popups-action";
import SettingsPathConfig from "./components/settings-path-config";
import SettingsFiledConfig from "./components/settings-filed-config";
import SettingsRobotConfig from "./components/settings-robot-config";
import SettingsFoldersConfig from "./components/settings-folders-config";
import { loadFieldImage, loadProjectFile } from "../..//handlers/project-handler";
import { setFiledImage, addPath, setProjectSettings, setProjectFolderPath } from '../app/app-action';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.saveSettings = this.saveSettings.bind(this);

        this.settingsFoldersConfig = new SettingsFoldersConfig();
        this.settingsRobotConfig = new SettingsRobotConfig();
        this.settingsFiledConfig = new SettingsFiledConfig();
        this.settingsPathConfig = new SettingsPathConfig();
    }

    saveSettings() {
        const settings = {
            ...this.settingsFoldersConfig.getData(),
            pathConfig: this.settingsPathConfig.getData(),
            fieldConfig: this.settingsFiledConfig.getData(),
            robotDrawConfig: this.settingsRobotConfig.getData(),
        };

        this.props.setSettings(settings);
        if (settings.projectPath !== this.props.projectPath)
            loadProjectFile(this.props.setProjectSettings, this.props.setProjectFolderPath,
                this.props.setFiledImage, this.props.addPath);
        if (settings.fieldConfig.imageName !== this.props.fieldConfig.imageName)
            loadFieldImage(this.props.projectPath, settings.fieldConfig.imageName, this.props.setFiledImage);
    }

    render() {
        var updateButton = <span />;
        if (this.props.newVersion !== undefined) {
            updateButton = <Button variant="outline-success" onClick={updateApp}>
                {`Update to v${this.props.newVersion}`}
            </Button>
        }

        return (
            <Modal show={this.props.projectPath === undefined || this.props.popupsStatus.settingsPopup}
                onHide={this.props.closeSettings} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="SettingsBody ml-1">
                        {this.settingsFoldersConfig.render(this.props)}
                        {this.settingsRobotConfig.render(this.props)}
                        {this.settingsFiledConfig.render(this.props)}
                        {this.settingsPathConfig.render(this.props)}

                        <div style={{ fontSize: 10 }}>v{this.props.version}</div>
                    </div>
                </Modal.Body >
                <Modal.Footer >
                    {updateButton}
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
        fieldConfig: state.fieldConfig,
        pathConfig: state.pathConfig,
        newVersion: state.newVersion,
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
