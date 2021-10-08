import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ConfirmPopup({ title, body, onCancel, onConfirm, show }) {
	const cancelButtonRef = useRef();
	useEffect(() => cancelButtonRef.current && cancelButtonRef.current.focus());

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
