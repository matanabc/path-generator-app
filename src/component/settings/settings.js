import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

import SettingsDriveTypeConfig from './settings-drive-type-config';
import { loadFieldImage } from '../../handlers/project-handler';
import SettingsFoldersConfig from './settings-folders-config';
import { setSettings } from '../../redux/project/actions';
import SettingsRobotConfig from './settings-robot-config';
import SettingsFiledConfig from './settings-filed-config';
import SettingsPathConfig from './settings-path-config';
import { updateApp } from '../../handlers/app-handler';
import { CONFIRM_SHORTCUT } from '../../shortcut';

class Settings extends React.Component {
	componentDidUpdate() {
		if (this.props.show) mousetrap.bindGlobal(CONFIRM_SHORTCUT, this.saveSettings);
		else mousetrap.unbind(CONFIRM_SHORTCUT);
	}

	setElementData = (key, func) => {
		this[key] = func;
	};

	saveSettings = () => {
		let settings = {
			...this.driveType(),
			...this.pathConfig(),
			...this.filedConfig(),
			...this.robotDrawConfig(),
		};
		if (this.foldersConfig) settings = Object.assign(settings, this.foldersConfig());
		if (settings.image !== this.props.filedImageUrl) loadFieldImage(settings.image);
		this.props.setSettings(settings);
		this.props.onClose();
	};

	getUpdateButton = () => {
		if (this.props.newVersion !== undefined) {
			return (
				<Button variant="outline-success" onClick={updateApp}>{`Update to v${this.props.newVersion}`}</Button>
			);
		}
		return <span />;
	};

	getAppVersion = () => {
		if (this.props.isWeb) return <span />;
		return <div style={{ fontSize: 10 }}>v{this.props.version}</div>;
	};

	getFoldersConfig = () => {
		if (this.props.isWeb) return <span />;
		return <SettingsFoldersConfig setElementData={this.setElementData} />;
	};

	render() {
		return (
			<Modal centered show={this.props.show} onHide={this.props.onClose} backdrop="static">
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
					<Button variant="outline-primary" onClick={this.props.onClose}>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
