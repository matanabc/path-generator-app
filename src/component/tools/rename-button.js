import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';

import { RENAME_SHORTCUT } from '../../shortcut';
import PromptPopup from '../popups/prompt-popup';
import ToolsButton from './tools-button';

export default function RenameButton({ disabled, isPathMode, pathName, onRename }) {
	const [showPopup, setShowPopup] = useState(false);
	const onClick = (event) => {
		if (document.activeElement) document.activeElement.blur();
		if (event) event.preventDefault();
		setShowPopup(!showPopup);
	};
	const onConfirm = (newName) => {
		onRename(newName);
		setShowPopup(!showPopup);
	};

	return (
		<>
			<PromptPopup
				show={showPopup}
				onCancel={onClick}
				onConfirm={onConfirm}
				defaultValue={pathName}
				title={`Rename ${isPathMode ? 'path' : 'group'}`}
			/>
			<ToolsButton
				body={<MdEdit />}
				onClick={onClick}
				disabled={disabled}
				shortcut={RENAME_SHORTCUT}
				title={`Rename ${isPathMode ? 'path' : 'group'}`}
			/>
		</>
	);
}
