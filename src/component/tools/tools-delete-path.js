import { changePopupsStatus } from '../../redux/view/actions';
import { MdDelete } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsDeletePath extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		mousetrap.bindGlobal(['command+d', 'alt+d'], this.onClick);
	}

	onClick() {
		if (document.activeElement) document.activeElement.blur();
		if (this.props.path) this.props.showDeletePathPopup();
	}

	render() {
		return (
			<Button
				size="lg"
				variant="danger"
				className="mr-3"
				title="Delete path"
				onClick={this.onClick}
				disabled={!this.props.path}
			>
				<MdDelete />
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
		showDeletePathPopup: () => dispatch(changePopupsStatus('deletePathPopup')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsDeletePath);
