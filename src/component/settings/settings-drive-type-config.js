import { Row, Col, Button } from 'react-bootstrap';
import * as PathGenerator from 'path-generator';
import SettingsConfig from './settings-config';
import { connect } from 'react-redux';
import React from 'react';

class SettingsDriveTypeConfig extends SettingsConfig {
	constructor(props) {
		super(props);
		this.state = { driveType: PathGenerator.Tank };
		this.setDriveType = this.setDriveType.bind(this);
	}

	getData() {
		return { driveType: this.state.driveType };
	}

	componentDidMount() {
		this.props.setElementData('driveType', this.getData);
		this.setState(() => {
			return {
				driveType: this.props.driveType,
			};
		});
	}

	setDriveType(type) {
		this.setState(() => {
			return { driveType: PathGenerator[type] };
		});
	}

	getConfigInfo() {
		return 'Path config:';
	}

	getBody() {
		return (
			<Row className="mb-3">
				{PathGenerator.driveTypes.map((type, index) => {
					return (
						<Col key={index}>
							<Button
								block
								onClick={() => this.setDriveType(type)}
								active={this.state.driveType === PathGenerator[type]}
							>
								{type}
							</Button>
						</Col>
					);
				})}
			</Row>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		driveType: state.driveType,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDriveTypeConfig);
