import { Container, Row, Col, Button } from 'react-bootstrap';
import { Swerve, Tank } from 'path-generator';
import { connect } from 'react-redux';
import React from 'react';

class SettingsDriveTypeConfig extends React.Component {
	constructor(props) {
		super(props);
		this.state = { driveType: Tank };

		this.setDriveTypeTank = this.setDriveTypeTank.bind(this);
		this.setDriveTypeSwerve = this.setDriveTypeSwerve.bind(this);
	}

	componentDidMount() {
		this.props.setDriveType(this.props.driveType);
		this.setState(() => {
			return {
				driveType: this.props.driveType,
			};
		});
	}

	setDriveTypeTank() {
		this.props.setDriveType(Tank);
		this.setState(() => {
			return { driveType: Tank };
		});
	}

	setDriveTypeSwerve() {
		this.props.setDriveType(Swerve);
		this.setState(() => {
			return { driveType: Swerve };
		});
	}

	render() {
		return (
			<Container className="mb-3">
				<Row>
					<Col>
						<Button block onClick={this.setDriveTypeTank} active={this.state.driveType === Tank}>
							Tank
						</Button>
					</Col>
					<Col>
						<Button
							block
							onClick={this.setDriveTypeSwerve}
							active={this.state.driveType === Swerve}
						>
							Swerve
						</Button>
					</Col>
				</Row>
			</Container>
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
