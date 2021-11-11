import { Row, Button } from '../common';
import SettingsConfig from './settings-config';

export default function ExportTypeConfig({}) {
	const exportOptions = ['CSV', 'Json', 'Java', 'Python'];

	return (
		<SettingsConfig title='Export Type'>
			<Row className='mb-2'>
				{exportOptions.map((type) => (
					<Button key={type} className={'col'} onClick={() => {}}>
						{type}
					</Button>
				))}
			</Row>
		</SettingsConfig>
	);
}
