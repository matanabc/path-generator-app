import { InputGroup, OverlayTrigger, Tooltip, FormControl } from 'react-bootstrap';

import { TInputProps } from './types';

export default function Input({ title, tooltip, value, type, onChange }: TInputProps) {
	const showOverlay = tooltip ? undefined : false;

	return (
		<InputGroup>
			<OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>} show={showOverlay}>
				<InputGroup.Text>{title}</InputGroup.Text>
			</OverlayTrigger>
			<FormControl type={type} value={value} onChange={onChange} />
		</InputGroup>
	);
}
