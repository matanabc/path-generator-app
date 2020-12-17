import { changeProjectFolderPath, loadFieldImage } from '../../handlers/project-handler';
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
		this.getUpdateButton = this.getUpdateButton.bind(this);
		this.settingsFoldersConfig = new SettingsFoldersConfig();
		this.settingsRobotConfig = new SettingsRobotConfig();
		this.settingsFiledConfig = new SettingsFiledConfig();
		this.settingsPathConfig = new SettingsPathConfig();
	}

	saveSettings() {
		const settings = {
			...this.settingsFiledConfig.getData(),
			...this.settingsFoldersConfig.getData(),
			pathConfig: this.settingsPathConfig.getData(),
			robotDrawConfig: this.settingsRobotConfig.getData(),
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
						{this.props.isWeb ? <span /> : this.settingsFoldersConfig.render(this.props)}
						{this.settingsRobotConfig.render(this.props)}
						{this.settingsFiledConfig.render(this.props)}
						{this.settingsPathConfig.render(this.props)}
						{this.props.isWeb ? (
							<span />
						) : (
							<div style={{ fontSize: 10 }}>v{this.props.version}</div>
						)}
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
		robotDrawConfig: state.robotDrawConfig,
		popupsStatus: state.popupsStatus,
		projectPath: state.projectPath,
		fieldConfig: state.fieldConfig,
		pathConfig: state.pathConfig,
		newVersion: state.newVersion,
		filedImageUrl: state.image,
		saveCSVTo: state.saveCSVTo,
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
