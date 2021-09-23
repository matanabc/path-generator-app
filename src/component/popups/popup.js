import { Modal, Button } from 'react-bootstrap';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.cancelButtonRef = React.createRef();
	}

	componentDidUpdate() {
		if (!this.props.show) return;
		if (this.props.refToUse !== undefined && this.props.refToUse.current !== null)
			setTimeout(() => {
				if (this.props.refToUse.current !== null) this.props.refToUse.current.focus();
			}, 100);
		else if (this.cancelButtonRef.current !== null) this.cancelButtonRef.current.focus();
		if (this.props.confirm)
			mousetrap.bindGlobal(['return', 'enter'], () => {
				if (document.activeElement === this.cancelButtonRef.current) return;
				if (this.props.show) this.props.confirm();
			});
	}

	render() {
		var confirmButton = <Button onClick={this.props.confirm}>confirm</Button>;
		var cancelButton = (
			<Button variant="outline-primary" onClick={this.props.close} ref={this.cancelButtonRef}>
				cancel
			</Button>
		);
		if (this.props.confirm === undefined) {
			confirmButton = <span />;
			cancelButton = (
				<Button ref={this.cancelButtonRef} onClick={this.props.close}>
					ok
				</Button>
			);
		}

		return (
			<Modal show={this.props.show} onHide={this.props.close}>
				<Modal.Header>
					<Modal.Title>{this.props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{this.props.body}</Modal.Body>
				<Modal.Footer>
					{cancelButton}
					{confirmButton}
				</Modal.Footer>
			</Modal>
		);
	}
}

export default Popup;
