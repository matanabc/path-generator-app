import SettingsConfig from './settings-config';
import { useFieldStore } from '../../store';
import { Input, Row } from '../common';

export default function FiledConfig() {
	const { widthInMeter, heightInMeter, image, updateFieldStore } = useFieldStore();

	return (
		<SettingsConfig title='Filed Configuration'>
			<Row className='mb-2'>
				<Input
					type='number'
					title='Width'
					tooltip='in meters'
					value={widthInMeter}
					onChange={({ target }) => updateFieldStore({ widthInMeter: Number(target.value) })}
				/>
				<Input
					type='number'
					title='Height'
					tooltip='in meters'
					value={heightInMeter}
					onChange={({ target }) => updateFieldStore({ heightInMeter: Number(target.value) })}
				/>
			</Row>

			<Row>
				<Input
					title='Image'
					value={image}
					onChange={({ target }) => updateFieldStore({ image: target.value })}
				/>
			</Row>
		</SettingsConfig>
	);
}
