import { changePopupsStatus } from '../../redux/view/actions';
import { MdEdit } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsRenamePath extends React.Component {
	constructor(props) {
		super(props);
		this.ref = React.createRef();
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		mousetrap.bindGlobal(['command+r', 'alt+r'], this.onClick);
	}

	onClick() {
		if (this.props.path) this.props.showRenamePathPopup();
	}

	render() {
		return (
			<Button
				size="lg"
				ref={this.ref}
				className="mr-3"
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
