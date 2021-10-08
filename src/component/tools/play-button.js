import React from 'react';

import { PLAY_SHORTCUT } from '../../shortcut';
import ToolsButton from './tools-button';

export default function PlayButton({ path, body, onPlay }) {
	const onClick = () => {
		if (document.querySelector('.modal-content') !== null) return;
		if (document.activeElement) document.activeElement.blur();
		onPlay();
	};

	return (
		<ToolsButton
			body={body}
			onClick={onClick}
			shortcut={PLAY_SHORTCUT}
			disabled={!path || path.waypoints.length <= 1 || path.isIllegal()}
		/>
	);
}
