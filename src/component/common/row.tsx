import { Stack } from 'react-bootstrap';

import { TRowProps } from './types';

export default function Row({ children, className, style }: TRowProps) {
	return (
		<Stack className={className} style={style} direction='horizontal' gap={2}>
			{children}
		</Stack>
	);
}
