import SettingsConfig from './settings-config';
import { Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class SettingsFoldersConfig extends SettingsConfig {
	constructor(props) {
		super(props);
		this.CSVFolderRef = React.createRef();
		this.projectFolderRef = React.createRef();
	}

	componentDidMount() {
		this.props.setElementData('foldersConfig', this.getData);
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

	getBody() {
		return (
			<div>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Project folder</Form.Label>
						<Form.Control defaultValue={this.props.projectPath} ref={this.projectFolderRef} />
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
