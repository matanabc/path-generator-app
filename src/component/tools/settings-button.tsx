import { MdBuild } from 'react-icons/md';
import { useState } from 'react';

import Button from '../common/button';
import { Settings } from '../settings';
import { SETTINGS_SHORTCUT } from '../../shortcut';

export default function SettingsButton({}) {
	const [show, setShow] = useState(false);

	return (
		<>
			<Settings show={show} onClose={() => setShow(false)} />
			<Button title='Settings' onClick={() => setShow(true)} shortcut={SETTINGS_SHORTCUT}>
				<MdBuild />
			</Button>
		</>
	);
}
