import { changePopupsStatus } from '../../redux/view/actions';
import { MdDelete } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class ToolsDeletePath extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		const Mousetrap = require('mousetrap');
		Mousetrap.bind('d', this.onClick);
	}

	onClick() {
		if (this.props.path) this.props.showDeletePathPopup();
	}

	render() {
		return (
			<Button
				className="mr-3"
				size="lg"
				title="Delete path"
				variant="danger"
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
