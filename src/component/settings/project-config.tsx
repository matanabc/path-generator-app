import { Input, Row } from '../common';
import { useFilesStore } from '../../store';
import SettingsConfig from './settings-config';

export default function ProjectConfig({}) {
	const exportFolder = useFilesStore((state) => state.exportFolder);
	const projectFolder = useFilesStore((state) => state.projectFolder);
	const setExportFolder = useFilesStore((state) => state.setExportFolder);
	const setProjectFolder = useFilesStore((state) => state.setProjectFolder);

	return (
		<SettingsConfig title='Folders Configuration'>
			<Row className='mb-2'>
				<Input
					value={projectFolder}
					title='Project Folder'
					onChange={({ target }) => setProjectFolder(target.value)}
				/>
			</Row>

			<Row className='mb-2'>
				<Input
					value={exportFolder}
					title='Export Folder'
					onChange={({ target }) => setExportFolder(target.value)}
				/>
			</Row>
		</SettingsConfig>
	);
}
