import SettingsDriveTypeConfig from './settings-drive-type-config';
import { loadFieldImage } from '../../handlers/project-handler';
import { changePopupsStatus } from '../../redux/view/actions';
import SettingsFoldersConfig from './settings-folders-config';
import { setSettings } from '../../redux/project/actions';
import SettingsRobotConfig from './settings-robot-config';
import SettingsFiledConfig from './settings-filed-config';
import SettingsPathConfig from './settings-path-config';
import { updateApp } from '../../handlers/app-handler';
import { CONFIRM_SHORTCUT } from '../../shortcut';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.saveSettings = this.saveSettings.bind(this);
		this.closeSettings = this.closeSettings.bind(this);
		this.getAppVersion = this.getAppVersion.bind(this);
		this.setElementData = this.setElementData.bind(this);
		this.getUpdateButton = this.getUpdateButton.bind(this);
		this.getFoldersConfig = this.getFoldersConfig.bind(this);
	}

	componentDidUpdate() {
		if (this.props.popupsStatus.settingsPopup) mousetrap.bindGlobal(CONFIRM_SHORTCUT, this.saveSettings);
		else mousetrap.unbind('enter');
	}

	setElementData(key, func) {
		this[key] = func;
	}

	saveSettings() {
		var settings = {
			...this.driveType(),
			...this.pathConfig(),
			...this.filedConfig(),
			...this.robotDrawConfig(),
		};
		if (this.foldersConfig) settings = Object.assign(settings, this.foldersConfig());
		if (settings.image !== this.props.filedImageUrl) loadFieldImage(settings.image);
		this.props.setSettings(settings);
		this.props.closePopups();
	}

	getUpdateButton() {
		if (this.props.newVersion !== undefined) {
			return (
				<Button variant="outline-success" onClick={updateApp}>{`Update to v${this.props.newVersion}`}</Button>
			);
		}
		return <span />;
	}

	getAppVersion() {
		if (this.props.isWeb) return <span />;
		return <div style={{ fontSize: 10 }}>v{this.props.version}</div>;
	}

	getFoldersConfig() {
		if (this.props.isWeb) return <span />;
		return <SettingsFoldersConfig setElementData={this.setElementData} />;
	}

	closeSettings() {
		if (this.resetProjectPath) this.resetProjectPath();
		this.props.closePopups();
	}

	render() {
		return (
			<Modal show={this.props.popupsStatus.settingsPopup} onHide={this.closeSettings} backdrop="static">
				<Modal.Header>
					<Modal.Title>Settings</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="SettingsBody">
						{this.getFoldersConfig()}
						<SettingsDriveTypeConfig setElementData={this.setElementData} />
						<SettingsPathConfig setElementData={this.setElementData} />
						<SettingsFiledConfig setElementData={this.setElementData} />
						<SettingsRobotConfig setElementData={this.setElementData} />
						{this.getAppVersion()}
					</div>
				</Modal.Body>
				<Modal.Footer>
					{this.getUpdateButton()}
					<Button variant="outline-primary" onClick={this.closeSettings}>
						cancel
					</Button>
					<Button onClick={this.saveSettings}>save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		popupsStatus: state.popupsStatus,
		projectPath: state.projectPath,
		newVersion: state.newVersion,
		filedImageUrl: state.image,
		version: state.version,
		isWeb: state.isWeb,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSettings: (settings) => dispatch(setSettings(settings)),
		closePopups: () => dispatch(changePopupsStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
