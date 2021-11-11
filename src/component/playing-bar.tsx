import { Form, Container, Row } from 'react-bootstrap';

export default function PlayingBar({}) {
	return (
		<Container className='mt-1'>
			<Row>
				<Form.Control type='range' />
			</Row>
		</Container>
	);
}
