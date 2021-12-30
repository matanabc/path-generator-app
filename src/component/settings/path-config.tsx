import { DriveTypeOption } from '../../common/enums';
import { Input, Row, Button } from '../common';
import SettingsConfig from './settings-config';
import { useRobotStore } from '../../store';

export default function PathConfig() {
	const { driveType, pathConfig, setDriveType, setPathConfig } = useRobotStore();
	const { robotLoopTime, acc, vMax, length, width } = pathConfig;

	return (
		<SettingsConfig title='Path Configuration'>
			<Row className='mb-2'>
				{Object.keys(DriveTypeOption).map((type) => (
					<Button key={type} className={'col'} active={type === driveType} onClick={() => setDriveType(type)}>
						{type}
					</Button>
				))}
			</Row>

			<Row className='mb-2'>
				<Input
					type='number'
					title='Width'
					tooltip='in meters'
					value={width}
					onChange={({ target }) => setPathConfig({ width: Number(target.value) })}
				/>
				<Input
					type='number'
					title='Length'
					tooltip='in meters'
					value={length}
					onChange={({ target }) => setPathConfig({ length: Number(target.value) })}
				/>
			</Row>

			<Row className='mb-2'>
				<Input
					type='number'
					title='Max V'
					tooltip='in meters'
					value={vMax}
					onChange={({ target }) => setPathConfig({ vMax: Number(target.value) })}
				/>
				<Input
					title='Acc'
					type='number'
					tooltip='in meters'
					value={acc}
					onChange={({ target }) => setPathConfig({ acc: Number(target.value) })}
				/>
				<Input
					type='number'
					tooltip='in sec'
					title='Loop Time'
					value={robotLoopTime}
					onChange={({ target }) => setPathConfig({ robotLoopTime: Number(target.value) })}
				/>
			</Row>
		</SettingsConfig>
	);
}
