import { Input, Row } from '../common';
import SettingsConfig from './settings-config';

export default function ProjectConfig({}) {
	return (
		<SettingsConfig title='Folders Configuration'>
			<Row className='mb-2'>
				<Input title='Project Folder' value={''} onChange={() => {}} />
			</Row>

			<Row className='mb-2'>
				<Input title='Export Folder' value={''} onChange={() => {}} />
			</Row>
		</SettingsConfig>
	);
}
