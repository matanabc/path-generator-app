import { Container, Row } from 'react-bootstrap';
import React from 'react';

class SettingsConfig extends React.Component {
	constructor(props) {
		super(props);
		this.getData = this.getData.bind(this);
		this.style = { fontSize: 20, fontWeight: 'bold' };
	}

	getData() {
		return {};
	}

	getConfigInfo() {
		return '';
	}

	getBody() {
		return <div />;
	}

	render() {
		return (
			<div>
				<Row className="ml-0 mb-1">
					<span style={this.style}>{this.getConfigInfo()}</span>
				</Row>
				<Container>{this.getBody()}</Container>
			</div>
		);
	}
}

export default SettingsConfig;
