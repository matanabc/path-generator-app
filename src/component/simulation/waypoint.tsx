import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useEffect, useRef, useState } from 'react';

import { useFieldStore, useGenerateStore } from '../../store';
import { BORDER_SIZE, WAYPOINT_SIZE } from '../../consts';
import { materToPixel, pixelToMater } from '../../util';
import WaypointInfo from './waypoint-info';
import { TWaypointProps } from './types';
import Robot from './robot';

const minOffset = WAYPOINT_SIZE / 2 - BORDER_SIZE / 2;
const maxOffset = WAYPOINT_SIZE / 2 + BORDER_SIZE / 2;

export default function Waypoint({ index, waypoint }: TWaypointProps) {
	const waypointRef = useRef<HTMLDivElement>(null);
	const [showInfo, setShowInfo] = useState(false);
	const [showRobot, setShowRobot] = useState(false);
	const { setWaypoint, addWaypoint, removeWaypoint } = useGenerateStore();
	const { topLeftX, topLeftY, widthInPixel, heightInPixel } = useFieldStore();

	const { x, y } = materToPixel(waypoint.x, waypoint.y);
	const position = { x: x + topLeftX - minOffset, y: y + topLeftY - minOffset };
	const bounds = {
		...{ top: topLeftY - minOffset, left: topLeftX - minOffset },
		...{ right: topLeftX + widthInPixel - maxOffset, bottom: topLeftY + heightInPixel - maxOffset },
	};

	const onClose = () => setShowInfo(false);
	const onDoubleClick = () => setShowInfo(true);
	const onWheel = (e: WheelEvent) =>
		setWaypoint(index, { angle: Number((waypoint.angle + e.deltaY * 0.1).toFixed(3)) });
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
		waypoint.onmouseenter = () => setShowRobot(true);
		waypoint.onmouseleave = () => setShowRobot(false);
		waypoint.addEventListener('dblclick', onDoubleClick);
	});

	return (
		<>
			{showRobot && <Robot position={{ ...position, angle: waypoint.angle }} />}
			<WaypointInfo
				index={index}
				show={showInfo}
				onClose={onClose}
				waypoint={waypoint}
				setWaypoint={setWaypoint}
			/>
			<Draggable position={position} bounds={bounds} onStart={onStart} onDrag={onDrag}>
				<div id='Waypoint' ref={waypointRef}>
					{index + 1}
				</div>
			</Draggable>
		</>
	);
}
