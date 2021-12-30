import { MdBuild } from 'react-icons/md';
import { useState } from 'react';

import { SETTINGS_SHORTCUT } from '../../common/shortcut';
import { Settings } from '../settings';
import Button from '../common/button';

export default function SettingsButton() {
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
