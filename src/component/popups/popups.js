import { deletePath, renamePath } from '../../redux/path/actions';
import { changePopupsStatus } from '../../redux/view/actions';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Popup from './popup';
import React from 'react';

class Popups extends React.Component {
	constructor(props) {
		super(props);
		this.renamePathRef = React.createRef();
		this.renamePath = this.renamePath.bind(this);
		this.deletePath = this.deletePath.bind(this);
	}

	componentDidUpdate() {
		if (this.props.popupsStatus.renamePathPopup)
			this.renamePathRef.current.defaultValue = this.props.pathName;
	}

	deletePath() {
		this.props.closePopups();
		this.props.deletePath();
	}

	renamePath() {
		if (this.renamePathRef.current.value) {
			this.props.renamePath(this.renamePathRef.current.value);
			this.props.closePopups();
		}
	}

	render() {
		return (
			<div>
				<Popup
					show={this.props.popupsStatus.deletePathPopup}
					body="Are you sure you want to delete path?"
					close={this.props.closePopups}
					confirm={this.deletePath}
					title="Delete path"
				/>

				<Popup
					show={this.props.popupsStatus.renamePathPopup}
					body={<FormControl ref={this.renamePathRef} />}
					close={this.props.closePopups}
					refToUse={this.renamePathRef}
					confirm={this.renamePath}
					title="Rename path"
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathName: state.path.selectedPath ? state.path.selectedPath : '',
		path: state.path.paths[state.path.selectedPath],
		popupsStatus: state.view.popupsStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closePopups: () => dispatch(changePopupsStatus()),
		renamePath: (name) => dispatch(renamePath(name)),
		deletePath: () => dispatch(deletePath()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Popups);
