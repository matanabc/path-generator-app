import SettingsConfig from './settings-config';
import { Form, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class SettingsPathConfig extends SettingsConfig {
	constructor(props) {
		super(props);

		this.pathWidthRef = React.createRef();
		this.robotMaxVRef = React.createRef();
		this.pathLengthRef = React.createRef();
		this.robotMaxAccRef = React.createRef();
		this.robotLoopTimeRef = React.createRef();
	}

	componentDidMount() {
		this.props.setElementData('pathConfig', this.getData);
	}

	componentDidUpdate() {
		this.robotMaxVRef.current.value = this.props.pathConfig.vMax;
		this.pathWidthRef.current.value = this.props.pathConfig.width;
		this.robotMaxAccRef.current.value = this.props.pathConfig.acc;
		this.pathLengthRef.current.value = this.props.pathConfig.length;
		this.robotLoopTimeRef.current.value = this.props.pathConfig.robotLoopTime;
	}

	getData() {
		return {
			pathConfig: new this.props.driveType.PathConfig(
				Number(this.robotMaxVRef.current.value),
				Number(this.robotMaxAccRef.current.value),
				Number(this.pathWidthRef.current.value),
				Number(this.pathLengthRef.current.value),
				Number(this.robotLoopTimeRef.current.value)
			),
		};
	}

	getBody() {
		return (
			<Form.Row>
				<Form.Group as={Col}>
					<OverlayTrigger overlay={<Tooltip> m </Tooltip>}>
						<Form.Label>Width</Form.Label>
					</OverlayTrigger>
					<Form.Control type="number" ref={this.pathWidthRef} defaultValue={this.props.pathConfig.width} />
				</Form.Group>
				<Form.Group as={Col}>
					<OverlayTrigger overlay={<Tooltip> m </Tooltip>}>
						<Form.Label>Length</Form.Label>
					</OverlayTrigger>
					<Form.Control type="number" ref={this.pathLengthRef} defaultValue={this.props.pathConfig.length} />
				</Form.Group>
				<Form.Group as={Col}>
					<OverlayTrigger overlay={<Tooltip> m / s </Tooltip>}>
						<Form.Label>Max V</Form.Label>
					</OverlayTrigger>
					<Form.Control type="number" ref={this.robotMaxVRef} defaultValue={this.props.pathConfig.vMax} />
				</Form.Group>
				<Form.Group as={Col}>
					<OverlayTrigger overlay={<Tooltip> m / s ^ 2 </Tooltip>}>
						<Form.Label>Max Acc</Form.Label>
					</OverlayTrigger>
					<Form.Control type="number" ref={this.robotMaxAccRef} defaultValue={this.props.pathConfig.acc} />
				</Form.Group>
				<Form.Group as={Col}>
					<OverlayTrigger overlay={<Tooltip> s </Tooltip>}>
						<Form.Label>Loop time</Form.Label>
					</OverlayTrigger>
					<Form.Control
						type="number"
						ref={this.robotLoopTimeRef}
						defaultValue={this.props.pathConfig.robotLoopTime}
					/>
				</Form.Group>
			</Form.Row>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathConfig: state.pathConfig,
		driveType: state.driveType,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPathConfig);
