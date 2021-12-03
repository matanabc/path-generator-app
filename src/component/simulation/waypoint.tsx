import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useEffect, useRef } from 'react';

import { BORDER_SIZE, WAYPOINT_SIZE } from '../../consts';
import { materToPixel, pixelToMater } from '../../util';
import { useFieldStore } from '../../store';
import { TWaypointProps } from './types';

const minOffset = WAYPOINT_SIZE / 2 - BORDER_SIZE / 2;
const maxOffset = WAYPOINT_SIZE / 2 + BORDER_SIZE / 2;

export default function Waypoint({ index, waypoint, setWaypoint }: TWaypointProps) {
	const waypointRef = useRef<HTMLDivElement>(null);
	const { x, y } = materToPixel(waypoint.x, waypoint.y);
	const { topLeftX, topLeftY, widthInPixel, heightInPixel } = useFieldStore();
	const position = { x: x + topLeftX - minOffset, y: y + topLeftY - minOffset };
	const bounds = {
		...{ top: topLeftY - minOffset, left: topLeftX - minOffset },
		...{ right: topLeftX + widthInPixel - maxOffset, bottom: topLeftY + heightInPixel - maxOffset },
	};

	const onWheel = (e: WheelEvent) => setWaypoint(index, { angle: waypoint.angle + e.deltaY * 0.1 });
	const onDrag = (e: DraggableEvent, { x, y }: DraggableData) =>
		setWaypoint(index, pixelToMater(x - topLeftX + minOffset, y - topLeftY + minOffset));

	useEffect(() => {
		const waypoint = waypointRef.current;
		if (waypoint === null) return;
		waypoint.onwheel = onWheel;
	});

	return (
		<Draggable position={position} bounds={bounds} onDrag={onDrag}>
			<div id='Waypoint' ref={waypointRef}>
				{index + 1}
			</div>
		</Draggable>
	);
}
