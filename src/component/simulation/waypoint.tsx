import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { BORDER_SIZE, WAYPOINT_SIZE } from '../../consts';
import { materToPixel, pixelToMater } from '../../util';
import { useFieldStore } from '../../store';
import { TWaypointProps } from './types';

const minOffset = WAYPOINT_SIZE / 2 - BORDER_SIZE / 2;
const maxOffset = WAYPOINT_SIZE / 2 + BORDER_SIZE / 2;

export default function Waypoint({ index, waypoint, setWaypoint }: TWaypointProps) {
	const { x, y } = materToPixel(waypoint.x, waypoint.y);
	const { topLeftX, topLeftY, widthInPixel, heightInPixel } = useFieldStore();
	const position = { x: x + topLeftX - minOffset, y: y + topLeftY - minOffset };
	const bounds = {
		...{ top: topLeftY - minOffset, left: topLeftX - minOffset },
		...{ right: topLeftX + widthInPixel - maxOffset, bottom: topLeftY + heightInPixel - maxOffset },
	};

	const onDrag = (e: DraggableEvent, { x, y }: DraggableData) =>
		setWaypoint(index, pixelToMater(x - topLeftX + minOffset, y - topLeftY + minOffset));

	return (
		<Draggable position={position} bounds={bounds} onDrag={onDrag}>
			<div id='Waypoint'>{index + 1}</div>
		</Draggable>
	);
}
