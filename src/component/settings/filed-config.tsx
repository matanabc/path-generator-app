import { Input, Row } from '../common';
import SettingsConfig from './settings-config';

export default function FiledConfig({}) {
	return (
		<SettingsConfig title='Filed Configuration'>
			<Row className='mb-2'>
				<Input type='number' title='Width' tooltip='in meters' value={''} onChange={() => {}} />
				<Input type='number' title='Height' tooltip='in meters' value={''} onChange={() => {}} />
			</Row>

			<Row>
				<Input title='Image' value={''} onChange={() => {}} />
			</Row>
		</SettingsConfig>
	);
}
