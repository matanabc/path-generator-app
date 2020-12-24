import { Form, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RobotDrawConfig } from '../field-view/view-config';
import SettingsConfig from './settings-config';
import { connect } from 'react-redux';
import React from 'react';

class SettingsRobotConfig extends SettingsConfig {
	constructor(props) {
		super(props);

		this.robotWidthRef = React.createRef();
		this.robotLengthRef = React.createRef();
		this.robotCenterRef = React.createRef();
	}

	componentDidMount() {
		this.props.setElementData('robotDrawConfig', this.getData);
	}

	componentDidUpdate() {
		this.robotWidthRef.current.value = this.props.robotDrawConfig.width;
		this.robotLengthRef.current.value = this.props.robotDrawConfig.length;
		this.robotCenterRef.current.value = this.props.robotDrawConfig.center;
	}

	getData() {
		return {
			robotDrawConfig: new RobotDrawConfig(
				this.robotWidthRef.current.value,
				this.robotLengthRef.current.value,
				this.robotCenterRef.current.value
			),
		};
	}

	getConfigInfo() {
		return 'Robot draw config:';
	}

	getBody() {
		return (
			<Form.Row>
				<Form.Group as={Col} md="4">
					<OverlayTrigger overlay={<Tooltip> with bumper </Tooltip>}>
						<Form.Label>Width</Form.Label>
					</OverlayTrigger>
					<Form.Control
						type="number"
						ref={this.robotWidthRef}
						defaultValue={this.props.robotDrawConfig.width}
					/>
				</Form.Group>
				<Form.Group as={Col} md="4">
					<OverlayTrigger overlay={<Tooltip> with bumper </Tooltip>}>
						<Form.Label>Length</Form.Label>
					</OverlayTrigger>
					<Form.Control
						type="number"
						ref={this.robotLengthRef}
						defaultValue={this.props.robotDrawConfig.length}
					/>
				</Form.Group>
				<Form.Group as={Col} md="4">
					<OverlayTrigger
						overlay={
							<Tooltip>
								<span style={{ color: 'red' }}>back</span> {' (-) < '}
								<span style={{ color: 'rgb(50, 100, 0)' }}> center </span>
								{' < (+) '} <span style={{ color: 'blue' }}>front</span>
							</Tooltip>
						}
					>
						<Form.Label>Center</Form.Label>
					</OverlayTrigger>
					<Form.Control
						type="number"
						ref={this.robotCenterRef}
						defaultValue={this.props.robotDrawConfig.center}
					/>
				</Form.Group>
			</Form.Row>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		robotDrawConfig: state.robotDrawConfig,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsRobotConfig);
