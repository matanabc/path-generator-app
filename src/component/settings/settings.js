import { changePopupsStatus } from '../../redux/view/actions';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class Settings extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Modal
				show={this.props.popupsStatus.settingsPopup}
				onHide={this.props.closePopups}
				backdrop="static"
			>
				<Modal.Header>
					<Modal.Title>Settings</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="SettingsBody ml-1"></div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-primary" onClick={this.props.closePopups}>
						cancel
					</Button>
					<Button>save</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		popupsStatus: state.popupsStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closePopups: () => dispatch(changePopupsStatus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
