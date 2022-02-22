import { Row, Button } from '../common';
import SettingsConfig from './settings-config';
import { ExportOption } from '../../common/enums';
import { useFileExportType } from '../../store/use';

export default function ExportTypeConfig() {
	const { exportType, setExportType } = useFileExportType();

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
