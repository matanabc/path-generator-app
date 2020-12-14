import { FieldConfig } from '../field-view/view-config';
import SettingsConfig from './settings-config';
import { Form, Col } from 'react-bootstrap';
import React from 'react';

class SettingsFiledConfig extends SettingsConfig {
	constructor() {
		super();

		this.fieldHeightInPixelRef = React.createRef();
		this.fieldHeightInMeterRef = React.createRef();
		this.fieldWidthInPixelRef = React.createRef();
		this.fieldWidthInMeterRef = React.createRef();
		this.filedImageNameRef = React.createRef();
		this.fieldTopLeftXRef = React.createRef();
		this.fieldTopLeftYRef = React.createRef();
	}

	getData() {
		return {
			imageUrl: this.filedImageNameRef.current.value,
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

	render(props) {
		return (
			<div>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label style={this.style}>Filed config:</Form.Label>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Image name / URL</Form.Label>
						<Form.Control defaultValue={props.filedImageUrl} ref={this.filedImageNameRef} />
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Width in meter</Form.Label>
						<Form.Control
							defaultValue={props.fieldConfig.widthInMeter}
							ref={this.fieldWidthInMeterRef}
							type="number"
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Height in meter</Form.Label>
						<Form.Control
							defaultValue={props.fieldConfig.heightInMeter}
							ref={this.fieldHeightInMeterRef}
							type="number"
						/>
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Top left x</Form.Label>
						<Form.Control
							defaultValue={props.fieldConfig.topLeftXPixel}
							ref={this.fieldTopLeftXRef}
							type="number"
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Top left y</Form.Label>
						<Form.Control
							defaultValue={props.fieldConfig.topLeftYPixel}
							ref={this.fieldTopLeftYRef}
							type="number"
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Width in pixel</Form.Label>
						<Form.Control
							defaultValue={props.fieldConfig.widthInPixel}
							ref={this.fieldWidthInPixelRef}
							type="number"
						/>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Heigth in pixel</Form.Label>
						<Form.Control
							defaultValue={props.fieldConfig.heigthInPixel}
							ref={this.fieldHeightInPixelRef}
							type="number"
						/>
					</Form.Group>
				</Form.Row>
			</div>
		);
	}
}

export default SettingsFiledConfig;
