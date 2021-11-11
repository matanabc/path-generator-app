import { MdBuild } from 'react-icons/md';
import { useState } from 'react';

import Button from '../common/button';
import { Settings } from '../settings';
import { SETTINGS_SHORTCUT } from '../../shortcut';

export default function SettingsButton({}) {
	const [show, setShow] = useState(false);
	const onClick = () => setShow(!show);

	return (
		<>
			<Settings show={show} onClose={onClick} />
			<Button title='Settings' onClick={onClick} shortcut={SETTINGS_SHORTCUT}>
				<MdBuild />
			</Button>
		</>
	);
}
