import { changePopupsStatus } from '../../redux/view/actions';
import { MdBuild } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class ToolsSettings extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		const Mousetrap = require('mousetrap');
		Mousetrap.bind('p', this.onClick);
		Mousetrap.bind('esc', this.props.closeSettings);
	}

	onClick() {
		this.ref.current.blur();
		this.props.showSettings();
	}

	render() {
		return (
			<Button
				size="lg"
				ref={this.ref}
				className="mr-3"
				title="Settings"
				onClick={this.onClick}
				variant={this.props.newVersion ? 'success' : 'primary'}
			>
				<MdBuild />
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		newVersion: state.newVersion,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showSettings: () => dispatch(changePopupsStatus('settingsPopup')),
		closeSettings: () => dispatch(changePopupsStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsSettings);
