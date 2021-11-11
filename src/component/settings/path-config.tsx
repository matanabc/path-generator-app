import { Tank, Holonomic } from 'path-generator';

import { Input, Row, Button } from '../common';
import SettingsConfig from './settings-config';

export default function PathConfig({}) {
	const driveTypes = { Tank, Holonomic };

	return (
		<SettingsConfig title='Path Configuration'>
			<Row className='mb-2'>
				{Object.keys(driveTypes).map((type) => (
					<Button key={type} className={'col'} onClick={() => {}}>
						{type}
					</Button>
				))}
			</Row>

			<Row className='mb-2'>
				<Input type='number' title='Width' tooltip='in meters' value={0} onChange={() => {}} />
				<Input type='number' title='Length' tooltip='in meters' value={0} onChange={() => {}} />
			</Row>

			<Row className='mb-2'>
				<Input type='number' title='Max V' tooltip='in meters' value={0} onChange={() => {}} />
				<Input title='Acc' type='number' tooltip='in meters' value={0} onChange={() => {}} />
				<Input type='number' tooltip='in sec' title='Loop Time' value={0} onChange={() => {}} />
			</Row>
		</SettingsConfig>
	);
}
