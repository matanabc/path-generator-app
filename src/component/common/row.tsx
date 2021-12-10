import { Stack } from 'react-bootstrap';

import { TRowProps } from './types';

export default function Row({ children, className, style, gap = 2 }: TRowProps) {
	return (
		<Stack className={className} style={style} direction='horizontal' gap={gap}>
			{children}
		</Stack>
	);
}
