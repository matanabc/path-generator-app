import Draggable from 'react-draggable';
import { memo } from 'react';

import { TPathProps } from './types';
import { materToPixel } from '../../common/util';
import { WAYPOINT_SIZE } from '../../common/consts';

const offset = WAYPOINT_SIZE / 2;

export default memo(function Path({ coords, topLeftX, topLeftY }: TPathProps) {
	return (
		<>
			{coords.map((coord, index) => {
				const { x, y } = materToPixel(coord.x, coord.y);
				return (
					<Draggable key={index} position={{ x: x + topLeftX + offset, y: y + topLeftY + offset }}>
						<div id='Coord' />
					</Draggable>
				);
			})}
		</>
	);
});
