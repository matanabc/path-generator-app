import { Container, Row } from 'react-bootstrap';

import { HorizontalStack } from '../common';
import SettingsButton from './settings-button';

export default function Tools({}) {
	return (
		<Container className='mb-2 mt-2'>
			<Row xs='auto'>
				<HorizontalStack style={{ paddingLeft: 0 }}>
					<SettingsButton />
				</HorizontalStack>
			</Row>
		</Container>
	);
}
