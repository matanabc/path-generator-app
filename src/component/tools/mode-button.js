import React from 'react';
import { BiEdit, BiMovie } from 'react-icons/bi';

import ToolsButton from './tools-button';
import { MODE_SHORTCUT } from '../../shortcut';

export default function ModeButton({ isPathMode, onChangeMode }) {
	const onClick = (event) => {
		onChangeMode();
		if (event) event.preventDefault();
		if (document.activeElement) document.activeElement.blur();
	};

	return (
		<>
			<ToolsButton
				shortcut={MODE_SHORTCUT}
				body={isPathMode ? <BiMovie /> : <BiEdit />}
				onClick={onClick}
				title={`Change to ${isPathMode ? 'group' : 'path'} mode`}
			/>
		</>
	);
}
