import React, { useState } from 'react';
import { MdBuild } from 'react-icons/md';

import ToolsButton from './tools-button';
import Settings from '../settings/settings';
import { SETTINGS_SHORTCUT } from '../../shortcut';

export default function SettingsButton({ newVersion }) {
	const [showSettings, setShowSettings] = useState(false);
	const onClick = (event) => {
		setShowSettings(!showSettings);
		if (event) event.preventDefault();
		if (document.activeElement) document.activeElement.blur();
	};

	return (
		<>
			<Settings show={showSettings} onClose={() => setShowSettings(false)} />
			<ToolsButton
				title="Settings"
				onClick={onClick}
				body={<MdBuild />}
				shortcut={SETTINGS_SHORTCUT}
				variant={newVersion ? 'success' : 'primary'}
			/>
		</>
	);
}
