import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useEffect, useRef, useState } from 'react';

import { BORDER_SIZE, OFFSET_SIZE } from '../../common/consts';
import { materToPixel, pixelToMater } from '../../common/util';
import WaypointInfo from './waypoint-info';
import { TWaypointProps } from './types';

export default function Waypoint({
	index,
	waypoint,
	topLeftX,
	topLeftY,
	robotVMax,
	widthInPixel,
	widthInMeter,
	heightInPixel,
	heightInMeter,
	setWaypoint,
	addWaypoint,
	removeWaypoint,
	setRobotPosition,
}: TWaypointProps) {
	const waypointRef = useRef<HTMLDivElement>(null);
	const [showInfo, setShowInfo] = useState(false);
	const [showRobot, setShowRobot] = useState(false);

	const { x, y } = materToPixel(waypoint.x, waypoint.y);
	const position = { x: x + topLeftX + BORDER_SIZE, y: y + topLeftY + BORDER_SIZE };
	const bounds = {
		top: topLeftY - OFFSET_SIZE,
		left: topLeftX - OFFSET_SIZE,
		right: topLeftX + widthInPixel - OFFSET_SIZE - BORDER_SIZE,
		bottom: topLeftY + heightInPixel - OFFSET_SIZE - BORDER_SIZE,
	};

	const onPaste = async () => showRobot && addWaypoint(index + 1, JSON.parse(await navigator.clipboard.readText()));
	const onCopy = async () => showRobot && (await navigator.clipboard.writeText(JSON.stringify(waypoint)));
	const onDoubleClick = () => setShowInfo(true);
	const onClose = () => setShowInfo(false);
	const onWheel = (e: WheelEvent) =>
		setWaypoint(index, { angle: Number((waypoint.angle + e.deltaY * 0.1).toFixed(3)) });
	const onDrag = (e: DraggableEvent, { x, y }: DraggableData) =>
		setWaypoint(index, pixelToMater(x - topLeftX - BORDER_SIZE, y - topLeftY - BORDER_SIZE));
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

	useEffect(() => {
		if (showRobot) setRobotPosition(-1 - index);
		else setRobotPosition(0);
	}, [showRobot]);

	return (
		<>
			<WaypointInfo
				index={index}
				show={showInfo}
				onClose={onClose}
				waypoint={waypoint}
				robotVMax={robotVMax}
				setWaypoint={setWaypoint}
				widthInMeter={widthInMeter}
				heightInMeter={heightInMeter}
			/>
			<Draggable position={position} bounds={bounds} onStart={onStart} onDrag={onDrag}>
				<div id='Waypoint' ref={waypointRef}>
					{index + 1}
				</div>
			</Draggable>
		</>
	);
}
