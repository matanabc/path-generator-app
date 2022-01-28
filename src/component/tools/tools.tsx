import { Container, Row } from 'react-bootstrap';

import SelectDropdown from './select-dropdown';
import SettingsButton from './settings-button';
import { HorizontalStack } from '../common';
import RenameButton from './rename-button';
import ExportButton from './export-button';
import DeleteButton from './delete-button';
import { TToolsProps } from './types';

export default function Tools({ path }: TToolsProps) {
	return (
		<Container className='mb-2 mt-2'>
			<Row xs='auto'>
				<HorizontalStack>
					<SettingsButton />
				</HorizontalStack>

				<HorizontalStack>
					<SelectDropdown />
					{path.coords.length > 0 && (
						<>
							<RenameButton />
							<ExportButton path={path} />
							<DeleteButton />
						</>
					)}
				</HorizontalStack>
			</Row>
		</Container>
	);
}
