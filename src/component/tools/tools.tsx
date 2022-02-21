import { Container, Row } from 'react-bootstrap';

import SelectDropdown from './select-dropdown';
import SettingsButton from './settings-button';
import { useGenerateStore } from '../../store';
import { HorizontalStack } from '../common';
import RenameButton from './rename-button';
import ExportButton from './export-button';
import DeleteButton from './delete-button';
import ErrorButton from './error-button';
import { TToolsProps } from './types';

export default function Tools({ path }: TToolsProps) {
	const { selected } = useGenerateStore();

	return (
		<Container className='mb-2 mt-2'>
			<Row xs='auto'>
				<HorizontalStack>
					<SettingsButton />
				</HorizontalStack>

				<HorizontalStack>
					<SelectDropdown />
					{selected !== '' && (
						<>
							<RenameButton />
							{path.isIllegal() ? <ErrorButton path={path} /> : <ExportButton path={path} />}
							<DeleteButton />
						</>
					)}
				</HorizontalStack>
			</Row>
		</Container>
	);
}
