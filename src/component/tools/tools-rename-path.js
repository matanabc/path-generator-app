import { changePopupsStatus } from '../../redux/view/actions';
import { MdEdit } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class ToolsRenamePath extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		const Mousetrap = require('mousetrap');
		Mousetrap.bind('r', this.onClick);
	}

	onClick() {
		if (this.props.path) this.props.showRenamePathPopup();
	}

	render() {
		return (
			<Button
				className="mr-3"
				size="lg"
				title="Rename path"
				onClick={this.onClick}
				disabled={!this.props.path}
			>
				<MdEdit />
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.paths[state.selectedPath],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showRenamePathPopup: () => dispatch(changePopupsStatus('renamePathPopup')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsRenamePath);
