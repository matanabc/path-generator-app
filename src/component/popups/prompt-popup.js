import { Modal, Button, FormControl } from 'react-bootstrap';
import { CONFIRM_SHORTCUT } from '../../shortcut';
import React, { useEffect, useRef } from 'react';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

export default function promptPopup({ title, placeholder, defaultValue, onCancel, onConfirm, show }) {
	const textRef = useRef();
	const onClick = () => onConfirm(textRef.current ? textRef.current.value : undefined);
	useEffect(() => {
		textRef.current && textRef.current.focus();
		show ? mousetrap.bindGlobal(CONFIRM_SHORTCUT, onClick) : mousetrap.unbind(CONFIRM_SHORTCUT, onClick);
	});

	return (
		<Modal centered show={show} onHide={onCancel}>
			{title && (
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
			)}
			<Modal.Body>
				<FormControl autoFocus ref={textRef} placeholder={placeholder} defaultValue={defaultValue} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-primary" onClick={onCancel}>
					cancel
				</Button>
				<Button onClick={onClick}>confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}
