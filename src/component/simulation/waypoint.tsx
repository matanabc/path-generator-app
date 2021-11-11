import Draggable from 'react-draggable';

import { TWaypointProps } from './types';

export default function Waypoint({ index }: TWaypointProps) {
	return (
		<Draggable bounds='#Path'>
			<div id='Waypoint'>{index}</div>
		</Draggable>
	);
}
