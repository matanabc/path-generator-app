import { changeProjectFolderPath } from '../../handlers/project-handler';
import SettingsConfig from './settings-config';
import { Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class SettingsFoldersConfig extends SettingsConfig {
	constructor(props) {
		super(props);
		this.state = { lastProjectPath: '' };
		this.CSVFolderRef = React.createRef();
		this.projectFolderRef = React.createRef();
		this.resetProjectPath = this.resetProjectPath.bind(this);
		this.onProjectFolderPathChange = this.onProjectFolderPathChange.bind(this);
	}

	componentDidMount() {
		this.props.setElementData('foldersConfig', this.getData);
		this.props.setElementData('resetProjectPath', this.resetProjectPath);
		this.setState(() => {
			return { lastProjectPath: this.props.projectPath };
		});
	}

	getData() {
		return {
			saveCSVTo: this.CSVFolderRef.current.value,
			projectPath: this.projectFolderRef.current.value,
		};
	}

	getConfigInfo() {
		return 'Folders config:';
	}

	onProjectFolderPathChange() {
		changeProjectFolderPath(this.projectFolderRef.current.value);
	}

	resetProjectPath() {
		if (this.props.projectPath !== this.state.lastProjectPath)
			changeProjectFolderPath(this.state.lastProjectPath);
	}

	getBody() {
		return (
			<div>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Project folder</Form.Label>
						<Form.Control
							defaultValue={this.props.projectPath}
							ref={this.projectFolderRef}
							onChange={this.onProjectFolderPathChange}
						/>
					</Form.Group>
				</Form.Row>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Paths CSV folder:</Form.Label>
						<Form.Control defaultValue={this.props.saveCSVTo} ref={this.CSVFolderRef} />
					</Form.Group>
				</Form.Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		projectPath: state.projectPath,
		saveCSVTo: state.saveCSVTo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsFoldersConfig);
