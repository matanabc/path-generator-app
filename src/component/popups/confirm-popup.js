import { CONFIRM_SHORTCUT } from '../../shortcut';
import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

export default function confirmPopup({ title, body, onCancel, onConfirm, show }) {
	const cancelButtonRef = useRef();
	useEffect(() => {
		cancelButtonRef.current && cancelButtonRef.current.focus();
		show ? mousetrap.bindGlobal(CONFIRM_SHORTCUT, onConfirm) : mousetrap.unbind(CONFIRM_SHORTCUT, onConfirm);
	});

	return (
		<Modal centered show={show} onHide={onCancel}>
			{title && (
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
			)}
			{body && <Modal.Body>{body}</Modal.Body>}
			<Modal.Footer>
				<Button ref={cancelButtonRef} variant="outline-primary" onClick={onCancel}>
					cancel
				</Button>
				<Button onClick={onConfirm}>confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}
