import { Modal, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

import { CONFIRM_SHORTCUT } from '../../../common/shortcut';
import { TConfirmPopupProps } from './types';

export default function ConfirmPopup(props: TConfirmPopupProps) {
	const { show, title, message, onCancel, onConfirm } = props;

	useEffect(() => {
		show ? mousetrap.bind(CONFIRM_SHORTCUT, onConfirm) : mousetrap.unbind(CONFIRM_SHORTCUT);
	});

	return (
		<Modal centered show={show} onHide={onCancel}>
			{title && (
				<Modal.Header>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
			)}
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-primary' onClick={onCancel}>
					cancel
				</Button>
				<Button onClick={onConfirm}>confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}
