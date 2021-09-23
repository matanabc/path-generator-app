import { changePopupsStatus } from '../../redux/view/actions';
import { MdDelete } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsDelete extends React.Component {
	componentDidMount = () => mousetrap.bindGlobal(['command+d', 'alt+d'], this.onClick);
	onClick = () => {
		const { path, showDeletePopup } = this.props;
		if (document.activeElement) document.activeElement.blur();
		if (path) showDeletePopup();
	};

	render() {
		const { path } = this.props;
		return (
			<Button size="lg" variant="danger" className="mr-3" title="Delete" onClick={this.onClick} disabled={!path}>
				<MdDelete />
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showDeletePopup: () => dispatch(changePopupsStatus('deletePopup')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsDelete);
