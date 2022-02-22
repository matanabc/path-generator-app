import Draggable from 'react-draggable';

import { TPathProps } from './types';
import { materToPixel } from '../../common/util';
import { useFieldTopLeft } from '../../store/use';
import { WAYPOINT_SIZE } from '../../common/consts';

const offset = WAYPOINT_SIZE / 2;

export default function Path({ coords }: TPathProps) {
	const { topLeftX, topLeftY } = useFieldTopLeft();

	return (
		<>
			{coords.map((coord, index) => {
				const { x, y } = materToPixel(coord.x, coord.y);
				return (
					<Draggable
						key={index}
						disabled={true}
						position={{ x: x + topLeftX + offset, y: y + topLeftY + offset }}
					>
						<div id='Coord' />
					</Draggable>
				);
			})}
		</>
	);
}
