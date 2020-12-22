import { Row, Col, Button } from 'react-bootstrap';
import SettingsConfig from './settings-config';
import { Swerve, Tank } from 'path-generator';
import { connect } from 'react-redux';
import React from 'react';

class SettingsDriveTypeConfig extends SettingsConfig {
	constructor(props) {
		super(props);
		this.state = { driveType: Tank };

		this.setDriveTypeTank = this.setDriveTypeTank.bind(this);
		this.setDriveTypeSwerve = this.setDriveTypeSwerve.bind(this);
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

	setDriveTypeTank() {
		this.setState(() => {
			return { driveType: Tank };
		});
	}

	setDriveTypeSwerve() {
		this.setState(() => {
			return { driveType: Swerve };
		});
	}

	getConfigInfo() {
		return 'Path config:';
	}

	getBody() {
		return (
			<Row className="mb-3">
				<Col>
					<Button block onClick={this.setDriveTypeTank} active={this.state.driveType === Tank}>
						Tank
					</Button>
				</Col>
				<Col>
					<Button block onClick={this.setDriveTypeSwerve} active={this.state.driveType === Swerve}>
						Swerve
					</Button>
				</Col>
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
