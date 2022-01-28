import TankPath from 'path-generator/lib/path/tank-path';
import { Container, Row } from 'react-bootstrap';
import SelectDropdown from './select-dropdown';
import SettingsButton from './settings-button';
import { HorizontalStack } from '../common';
import RenameButton from './rename-button';
import ExportButton from './export-button';
import DeleteButton from './delete-button';

type TProps = { path: TankPath };

export default function Tools({ path }: TProps) {
	return (
		<Container className='mb-2 mt-2'>
			<Row xs='auto'>
				<HorizontalStack>
					<SettingsButton />
				</HorizontalStack>

				<HorizontalStack>
					<SelectDropdown />
					<RenameButton />
					<ExportButton path={path} />
					<DeleteButton />
				</HorizontalStack>
			</Row>
		</Container>
	);
}
