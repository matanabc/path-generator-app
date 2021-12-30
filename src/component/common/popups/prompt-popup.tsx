import { Modal, Button, FormControl } from 'react-bootstrap';
import React, { useEffect, useRef } from 'react';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

import { CONFIRM_SHORTCUT } from '../../../common/shortcut';
import { TPromptPopupProps } from './types';

export default function PromptPopup(props: TPromptPopupProps) {
	const { show, title, placeholder, defaultValue, onCancel, onConfirm } = props;
	const textRef = useRef<HTMLInputElement>();

	const onClick = () => onConfirm(textRef.current ? textRef.current.value : '');

	useEffect(() => {
		setTimeout(() => textRef.current && textRef.current.focus(), 100);
		show ? mousetrap.bind(CONFIRM_SHORTCUT, onClick) : mousetrap.unbind(CONFIRM_SHORTCUT);
	});

	return (
		<Modal centered show={show} onHide={onCancel}>
			{title && (
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
			)}
			<Modal.Body>
				<FormControl
					autoFocus
					placeholder={placeholder}
					defaultValue={defaultValue}
					ref={textRef as React.RefObject<any>}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-primary' onClick={onCancel}>
					cancel
				</Button>
				<Button onClick={onClick}>confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}
