import Draggable from 'react-draggable';

import { useFieldStore } from '../../store';
import { materToPixel } from '../../util';
import { TWaypointProps } from './types';

export default function Waypoint({ index, waypoint }: TWaypointProps) {
	const { topLeftX, topLeftY, widthInPixel, heightInPixel } = useFieldStore();
	const { x, y } = materToPixel(waypoint.x, waypoint.y);
	const position = { x: x + topLeftX - 12.5, y: y + topLeftY - 12.5 };
	const bounds = {
		...{ top: topLeftY - 10, left: topLeftX - 10 },
		...{ right: topLeftX + widthInPixel - 20, bottom: topLeftY + heightInPixel - 20 },
	};

	return (
		<Draggable position={position} bounds={bounds}>
			<div id='Waypoint'>{index}</div>
		</Draggable>
	);
}
