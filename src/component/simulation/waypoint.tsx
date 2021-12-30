import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useEffect, useRef, useState } from 'react';

import { BORDER_SIZE, OFFSET_SIZE } from '../../common/consts';
import { materToPixel, pixelToMater } from '../../common/util';
import { useFieldStore, useGenerateStore } from '../../store';
import WaypointInfo from './waypoint-info';
import { TWaypointProps } from './types';
import Robot from './robot';

export default function Waypoint({ index, waypoint }: TWaypointProps) {
	const waypointRef = useRef<HTMLDivElement>(null);
	const [showInfo, setShowInfo] = useState(false);
	const [showRobot, setShowRobot] = useState(false);
	const { setWaypoint, addWaypoint, removeWaypoint } = useGenerateStore();
	const { topLeftX, topLeftY, widthInPixel, heightInPixel } = useFieldStore();

	const { x, y } = materToPixel(waypoint.x, waypoint.y);
	const position = { x: x + topLeftX, y: y + topLeftY };
	const bounds = {
		top: topLeftY - OFFSET_SIZE,
		left: topLeftX - OFFSET_SIZE,
		right: topLeftX + widthInPixel - OFFSET_SIZE - BORDER_SIZE,
		bottom: topLeftY + heightInPixel - OFFSET_SIZE - BORDER_SIZE,
	};

	const onClose = () => setShowInfo(false);
	const onDoubleClick = () => setShowInfo(true);
	const onCopy = async () => showRobot && (await navigator.clipboard.writeText(JSON.stringify(waypoint)));
	const onPaste = async () => showRobot && addWaypoint(index + 1, JSON.parse(await navigator.clipboard.readText()));
	const onWheel = (e: WheelEvent) =>
		setWaypoint(index, { angle: Number((waypoint.angle + e.deltaY * 0.1).toFixed(3)) });
	const onDrag = (e: DraggableEvent, { x, y }: DraggableData) =>
		setWaypoint(index, pixelToMater(x - topLeftX, y - topLeftY));
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
		document.oncopy = onCopy;
		document.onpaste = onPaste;
		waypoint.onwheel = onWheel;
		waypoint.onmouseenter = () => setShowRobot(true);
		waypoint.onmouseleave = () => setShowRobot(false);
		waypoint.addEventListener('dblclick', onDoubleClick);
	});

	return (
		<>
			{position.x !== Infinity && position.y !== Infinity && (
				<Robot position={{ ...position, angle: waypoint.angle }} />
			)}
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
