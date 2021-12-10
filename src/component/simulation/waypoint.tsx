import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useEffect, useRef } from 'react';
import shallow from 'zustand/shallow';

import { BORDER_SIZE, WAYPOINT_SIZE } from '../../consts';
import { useFieldStore, usePathStore } from '../../store';
import { materToPixel, pixelToMater } from '../../util';
import { TWaypointProps } from './types';

const minOffset = WAYPOINT_SIZE / 2 - BORDER_SIZE / 2;
const maxOffset = WAYPOINT_SIZE / 2 + BORDER_SIZE / 2;

const waypointSelector = ({ setWaypoint, addWaypoint, removeWaypoint }: any) => ({
	setWaypoint,
	addWaypoint,
	removeWaypoint,
});

export default function Waypoint({ index, waypoint }: TWaypointProps) {
	const waypointRef = useRef<HTMLDivElement>(null);
	const { x, y } = materToPixel(waypoint.x, waypoint.y);
	const { setWaypoint, addWaypoint, removeWaypoint } = usePathStore(waypointSelector, shallow);
	const { topLeftX, topLeftY, widthInPixel, heightInPixel } = useFieldStore();
	const position = { x: x + topLeftX - minOffset, y: y + topLeftY - minOffset };
	const bounds = {
		...{ top: topLeftY - minOffset, left: topLeftX - minOffset },
		...{ right: topLeftX + widthInPixel - maxOffset, bottom: topLeftY + heightInPixel - maxOffset },
	};

	const onWheel = (e: WheelEvent) => setWaypoint(index, { angle: waypoint.angle + e.deltaY * 0.1 });
	const onDrag = (e: DraggableEvent, { x, y }: DraggableData) =>
		setWaypoint(index, pixelToMater(x - topLeftX + minOffset, y - topLeftY + minOffset));
	const onStart = (e: DraggableEvent, data: DraggableData) => {
		if (e.ctrlKey) addWaypoint(index);
		if (e.shiftKey) {
			removeWaypoint(index);
			return false;
		}
	};

	useEffect(() => {
		const waypoint = waypointRef.current;
		if (waypoint === null) return;
		waypoint.onwheel = onWheel;
	});

	return (
		<Draggable position={position} bounds={bounds} onStart={onStart} onDrag={onDrag}>
			<div id='Waypoint' ref={waypointRef}>
				{index + 1}
			</div>
		</Draggable>
	);
}
