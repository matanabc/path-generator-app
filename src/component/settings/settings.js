import { changeProjectFolderPath, loadFieldImage } from '../../handlers/project-handler';
import SettingsDriveTypeConfig from './settings-drive-type-config';
import { changePopupsStatus } from '../../redux/view/actions';
import SettingsFoldersConfig from './settings-folders-config';
import { setSettings } from '../../redux/project/actions';
import SettingsRobotConfig from './settings-robot-config';
import SettingsFiledConfig from './settings-filed-config';
import SettingsPathConfig from './settings-path-config';
import { updateApp } from '../../handlers/app-handler';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.saveSettings = this.saveSettings.bind(this);
		this.getAppVersion = this.getAppVersion.bind(this);
		this.setElementData = this.setElementData.bind(this);
		this.getUpdateButton = this.getUpdateButton.bind(this);
		this.getFoldersConfig = this.getFoldersConfig.bind(this);
	}

	setElementData(key, func) {
		this[key] = func;
	}

	saveSettings() {
		const settings = {
			...this.driveType(),
			...this.pathConfig(),
			...this.filedConfig(),
			...this.foldersConfig(),
			...this.robotDrawConfig(),
		};

		this.props.setSettings(settings);
		this.props.closePopups();
		if (settings.image !== this.props.filedImageUrl) loadFieldImage(settings.image);
		if (settings.projectPath !== this.props.projectPath)
			changeProjectFolderPath(settings.projectPath);
	}

	getUpdateButton() {
		if (this.props.newVersion !== undefined) {
			return (
				<Button
					variant="outline-success"
					onClick={updateApp}
				>{`Update to v${this.props.newVersion}`}</Button>
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

	render() {
		return (
			<Modal
				show={this.props.popupsStatus.settingsPopup}
				onHide={this.props.closePopups}
				backdrop="static"
			>
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
					<Button variant="outline-primary" onClick={this.props.closePopups}>
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
