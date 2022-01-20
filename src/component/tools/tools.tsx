import { Container, Row } from 'react-bootstrap';

import RenameButton from './rename-button';
import { HorizontalStack } from '../common';
import SelectDropdown from './select-dropdown';
import SettingsButton from './settings-button';

export default function Tools() {
	return (
		<Container className='mb-2 mt-2'>
			<Row xs='auto'>
				<HorizontalStack>
					<SettingsButton />
				</HorizontalStack>

				<HorizontalStack>
					<SelectDropdown />
					<RenameButton />
				</HorizontalStack>
			</Row>
		</Container>
	);
}
