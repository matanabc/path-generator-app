import { changePopupsStatus } from '../../redux/view/actions';
import { MdBuild } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsSettings extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		mousetrap.bindGlobal(['command+p', 'alt+p'], this.onClick);
		mousetrap.bindGlobal('esc', this.props.closeSettings);
	}

	onClick() {
		if (document.activeElement) document.activeElement.blur();
		this.props.showSettings();
	}

	render() {
		return (
			<Button
				size="lg"
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
