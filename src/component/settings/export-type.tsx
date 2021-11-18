import { Row, Button } from '../common';
import { useFilesStore } from '../../store';
import { ExportOption } from '../../consts';
import SettingsConfig from './settings-config';

export default function ExportTypeConfig({}) {
	const exportType = useFilesStore((state) => state.exportType);
	const setExportType = useFilesStore((state) => state.setExportType);

	return (
		<SettingsConfig title='Export Type'>
			<Row className='mb-2'>
				{Object.values(ExportOption).map((type) => (
					<Button
						key={type}
						className={'col'}
						active={type === exportType}
						onClick={() => setExportType(type)}
					>
						{type}
					</Button>
				))}
			</Row>
		</SettingsConfig>
	);
}
