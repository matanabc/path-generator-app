import { Tank, Holonomic } from 'path-generator';
import { usePathConfigStore } from '../../store';

import { Input, Row, Button } from '../common';
import SettingsConfig from './settings-config';

export default function PathConfig({}) {
	const { driveType, pathConfig, setDriveType, setPathConfig } = usePathConfigStore();

	return (
		<SettingsConfig title='Path Configuration'>
			<Row className='mb-2'>
				<Button className={'col'} active={Tank === driveType} onClick={() => setDriveType(Tank)}>
					Tank
				</Button>
				<Button className={'col'} active={Holonomic === driveType} onClick={() => setDriveType(Holonomic)}>
					Holonomic
				</Button>
			</Row>

			<Row className='mb-2'>
				<Input
					type='number'
					title='Width'
					tooltip='in meters'
					value={pathConfig.width}
					onChange={({ target }) => setPathConfig({ width: Number(target.value) })}
				/>
				<Input
					type='number'
					title='Length'
					tooltip='in meters'
					value={pathConfig.length}
					onChange={({ target }) => setPathConfig({ length: Number(target.value) })}
				/>
			</Row>

			<Row className='mb-2'>
				<Input
					type='number'
					title='Max V'
					tooltip='in meters'
					value={pathConfig.vMax}
					onChange={({ target }) => setPathConfig({ vMax: Number(target.value) })}
				/>
				<Input
					title='Acc'
					type='number'
					tooltip='in meters'
					value={pathConfig.acc}
					onChange={({ target }) => setPathConfig({ acc: Number(target.value) })}
				/>
				<Input
					type='number'
					tooltip='in sec'
					title='Loop Time'
					value={pathConfig.robotLoopTime}
					onChange={({ target }) => setPathConfig({ robotLoopTime: Number(target.value) })}
				/>
			</Row>
		</SettingsConfig>
	);
}
