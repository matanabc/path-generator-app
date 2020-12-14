import { changePopupsStatus } from '../../redux/view/actions';
import SettingsFoldersConfig from './settings-folders-config';
import SettingsRobotConfig from './settings-robot-config';
import SettingsFiledConfig from './settings-filed-config';
import SettingsPathConfig from './settings-path-config';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.settingsFoldersConfig = new SettingsFoldersConfig();
		this.settingsRobotConfig = new SettingsRobotConfig();
		this.settingsFiledConfig = new SettingsFiledConfig();
		this.settingsPathConfig = new SettingsPathConfig();
	}

	render() {
		return (
			<Modal
				show={this.props.popupsStatus.settingsPopup || true}
				onHide={this.props.closePopups}
				backdrop="static"
			>
				<Modal.Header>
					<Modal.Title>Settings</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="SettingsBody ml-1">
						{this.settingsFoldersConfig.render(this.props)}
						{this.settingsRobotConfig.render(this.props)}
						{this.settingsFiledConfig.render(this.props)}
						{this.settingsPathConfig.render(this.props)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-primary" onClick={this.props.closePopups}>
						cancel
					</Button>
					<Button>save</Button>
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
		filedImageUrl: state.imageUrl,
		pathConfig: state.pathConfig,
		saveCSVTo: state.saveCSVTo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closePopups: () => dispatch(changePopupsStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
