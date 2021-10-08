import { MdDelete } from 'react-icons/all';
import React, { useState } from 'react';

import ConfirmPopup from '../popups/confirm-popup';
import { DELETE_SHORTCUT } from '../../shortcut';
import ToolsButton from './tools-button';

export default function DeleteButton({ disabled, isPathMode, pathName, onDelete }) {
	const [showPopup, setShowPopup] = useState(false);
	const type = isPathMode ? 'path' : 'group';
	const onClick = (event) => {
		if (document.activeElement) document.activeElement.blur();
		if (event) event.preventDefault();
		if (pathName === undefined) return;
		setShowPopup(!showPopup);
	};
	const onConfirm = async () => {
		await onDelete();
		setShowPopup(!showPopup);
	};

	return (
		<>
			<ConfirmPopup
				body={`Are you sure you want to delete ${pathName} ${type}?`}
				title={`Delete ${type}`}
				show={showPopup}
				onConfirm={onConfirm}
				onCancel={onClick}
			/>

			<ToolsButton
				variant="danger"
				onClick={onClick}
				disabled={disabled}
				body={<MdDelete />}
				title={`Delete ${type}`}
				shortcut={DELETE_SHORTCUT}
			/>
		</>
	);
}
