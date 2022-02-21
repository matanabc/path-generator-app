import SettingsConfig from './settings-config';
import { useRobotStore } from '../../store';
import { Input, Row } from '../common';

export default function RobotDrawConfig() {
	const { drawConfig, setDrawConfig } = useRobotStore();
	const { width, length, center } = drawConfig;

	return (
		<SettingsConfig title='Robot Draw Configuration'>
			<Row>
				<Input
					type='number'
					title='Width'
					value={width}
					tooltip='with bumper'
					onChange={({ target }) => setDrawConfig({ width: Number(target.value) })}
				/>
				<Input
					type='number'
					title='Length'
					value={length}
					tooltip='with bumper'
					onChange={({ target }) => setDrawConfig({ length: Number(target.value) })}
				/>
				<Input
					type='number'
					title='Center'
					value={center}
					tooltip='in meters'
					onChange={({ target }) => setDrawConfig({ center: Number(target.value) })}
				/>
			</Row>
		</SettingsConfig>
	);
}
