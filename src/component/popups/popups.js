import { changePopupsStatus } from '../../redux/view/actions';
import { deletePath } from '../../redux/path/actions';
import { connect } from 'react-redux';
import Popup from './popup';
import React from 'react';

class Popups extends React.Component {
	constructor(props) {
		super(props);
		this.deletePath = this.deletePath.bind(this);
	}

	deletePath() {
		this.props.deletePath();
		this.props.closeDeletePathPopup();
	}

	render() {
		return (
			<div>
				<Popup
					show={this.props.popupsStatus.deletePathPopup}
					body="Are you sure you want to delete path?"
					close={this.props.closeDeletePathPopup}
					confirm={this.deletePath}
					title="Delete path"
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path.paths[state.path.selectedPath],
		popupsStatus: state.view.popupsStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeDeletePathPopup: () => dispatch(changePopupsStatus('deletePathPopup')),
		deletePath: () => dispatch(deletePath()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Popups);
