import Draggable from 'react-draggable';

import { useFieldStore } from '../../store';
import { TWaypointProps } from './types';

export default function Waypoint({ index }: TWaypointProps) {
	const { topLeftX, topLeftY, widthInPixel, heightInPixel } = useFieldStore();
	const bounds = {
		top: topLeftY,
		left: topLeftX,
		right: topLeftX + widthInPixel - 30,
		bottom: topLeftY + heightInPixel - 30,
	};

	return (
		<Draggable bounds={bounds}>
			<div id='Waypoint'>{index}</div>
		</Draggable>
	);
}
