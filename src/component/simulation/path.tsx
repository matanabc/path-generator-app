import Draggable from 'react-draggable';

import { TPathProps } from './types';
import { materToPixel } from '../../common/util';

export default function Path({ coords, topLeftX, topLeftY }: TPathProps) {
	return (
		<>
			{coords.map((coord) => {
				const { x, y } = materToPixel(coord.x, coord.y);
				return (
					<Draggable position={{ x: x + topLeftX + 10, y: y + topLeftY + 10 }}>
						<div id='Coord' />
					</Draggable>
				);
			})}
		</>
	);
}
