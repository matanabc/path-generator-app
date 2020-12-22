import { Form, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FieldConfig } from '../field-view/view-config';
import SettingsConfig from './settings-config';
import { connect } from 'react-redux';
import React from 'react';

class SettingsFiledConfig extends SettingsConfig {
	constructor(props) {
		super(props);

		this.fieldHeightInPixelRef = React.createRef();
		this.fieldHeightInMeterRef = React.createRef();
		this.fieldWidthInPixelRef = React.createRef();
		this.fieldWidthInMeterRef = React.createRef();
		this.filedImageNameRef = React.createRef();
		this.fieldTopLeftXRef = React.createRef();
		this.fieldTopLeftYRef = React.createRef();
	}

	componentDidMount() {
		this.props.setElementData('filedConfig', this.getData);
	}

	getData() {
		return {
			image: this.filedImageNameRef.current.value,
			fieldConfig: new FieldConfig(
				this.fieldWidthInMeterRef.current.value,
				this.fieldHeightInMeterRef.current.value,
				this.fieldTopLeftXRef.current.value,
				this.fieldTopLeftYRef.current.value,
				this.fieldWidthInPixelRef.current.value,
				this.fieldHeightInPixelRef.current.value
			),
		};
	}

	getConfigInfo() {
		return 'Filed config:';
	}

	getBody() {
		return (
			<div>
				<Form.Row>
					<Form.Group as={Col}>
						<OverlayTrigger overlay={<Tooltip> In meter </Tooltip>}>
							<Form.Label>Width</Form.Label>
						</OverlayTrigger>
						<Form.Control
							defaultValue={this.props.fieldConfig.widthInMeter}
							ref={this.fieldWidthInMeterRef}
							type="number"
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<OverlayTrigger overlay={<Tooltip> In meter </Tooltip>}>
							<Form.Label>Height</Form.Label>
						</OverlayTrigger>
						<Form.Control
							defaultValue={this.props.fieldConfig.heightInMeter}
							ref={this.fieldHeightInMeterRef}
							type="number"
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Image</Form.Label>
						<Form.Control defaultValue={this.props.filedImageUrl} ref={this.filedImageNameRef} />
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Top left x</Form.Label>
						<Form.Control
							defaultValue={this.props.fieldConfig.topLeftXPixel}
							ref={this.fieldTopLeftXRef}
							type="number"
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Top left y</Form.Label>
						<Form.Control
							defaultValue={this.props.fieldConfig.topLeftYPixel}
							ref={this.fieldTopLeftYRef}
							type="number"
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<OverlayTrigger overlay={<Tooltip> In pixel </Tooltip>}>
							<Form.Label>Width</Form.Label>
						</OverlayTrigger>
						<Form.Control
							defaultValue={this.props.fieldConfig.widthInPixel}
							ref={this.fieldWidthInPixelRef}
							type="number"
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<OverlayTrigger overlay={<Tooltip> In pixel </Tooltip>}>
							<Form.Label>Height</Form.Label>
						</OverlayTrigger>
						<Form.Control
							defaultValue={this.props.fieldConfig.heigthInPixel}
							ref={this.fieldHeightInPixelRef}
							type="number"
						/>
					</Form.Group>
				</Form.Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		fieldConfig: state.fieldConfig,
		filedImageUrl: state.image,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsFiledConfig);
