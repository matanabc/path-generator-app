import Draggable from 'react-draggable';
import { memo } from 'react';

import { TPathProps } from './types';
import { materToPixel } from '../../common/util';

export default memo(function Path({ coords, topLeftX, topLeftY }: TPathProps) {
	return (
		<>
			{coords.map((coord, index) => {
				const { x, y } = materToPixel(coord.x, coord.y);
				return (
					<Draggable key={index} position={{ x: x + topLeftX + 10, y: y + topLeftY + 10 }}>
						<div id='Coord' />
					</Draggable>
				);
			})}
		</>
	);
});
