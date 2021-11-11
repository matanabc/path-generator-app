import { Input, Row } from '../common';
import SettingsConfig from './settings-config';

export default function RobotDrawConfig({}) {
	return (
		<SettingsConfig title='Robot Draw Configuration'>
			<Row>
				<Input type='number' title='Width' tooltip='in meters' value={''} onChange={() => {}} />
				<Input type='number' title='Length' tooltip='in meters' value={''} onChange={() => {}} />
				<Input type='number' title='Center' tooltip='with bumper' value={''} onChange={() => {}} />
			</Row>
		</SettingsConfig>
	);
}
