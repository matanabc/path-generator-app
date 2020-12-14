import React from 'react';

class SettingsConfig {
	constructor() {
		this.getData = this.getData.bind(this);

		this.style = { fontSize: 20, fontWeight: 'bold' };
	}

	getData() {
		return {};
	}

	render(props) {
		return <div />;
	}
}

export default SettingsConfig;
