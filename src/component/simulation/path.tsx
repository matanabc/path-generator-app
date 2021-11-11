import { Rnd } from 'react-rnd';

import { TPathProps } from './types';

export default function Path({}: TPathProps) {
	return (
		<Rnd bounds='#Field' disableDragging>
			<canvas id='Path' />
		</Rnd>
	);
}
