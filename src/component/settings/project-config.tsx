import { Input, Row } from '../common';
import SettingsConfig from './settings-config';
import { useFileExportFolder, useProjectFolder } from '../../store/use';

export default function ProjectConfig() {
	const { projectFolder, setProjectFolder } = useProjectFolder();
	const { exportFolder, setExportFolder } = useFileExportFolder();

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
