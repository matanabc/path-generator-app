import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

import { CONFIRM_SHORTCUT } from '../../shortcut';

export default function AlertPopup({ title, body, onClose, show }) {
	const okButtonRef = useRef();
	useEffect(() => {
		okButtonRef.current && okButtonRef.current.focus();
		show ? mousetrap.bindGlobal(CONFIRM_SHORTCUT, onClose) : mousetrap.unbind(CONFIRM_SHORTCUT, onClose);
	});

	return (
		<Modal centered show={show} onHide={onClose}>
			{title && (
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
			)}
			{body && <Modal.Body>{body}</Modal.Body>}
			<Modal.Footer>
				<Button ref={okButtonRef} onClick={onClose}>
					ok
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
