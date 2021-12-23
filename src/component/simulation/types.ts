import { Waypoint } from 'path-generator';
import { ControlPosition } from 'react-draggable';
import Coord from 'path-generator/lib/motionProfiling/coord';
import HolonomicWaypoint from 'path-generator/lib/waypoints/holonomic-waypoint';

export type TPosition = ControlPosition & { angle: number };
export type TSimulationViewProps = TFiledProps & {};
export type TRobotProps = { position: TPosition };
export type TPlayingBarProps = TPathProps & {};
export type TPathProps = { coords: Coord[] };
export type TFiledProps = {};

export type TWaypointProps = {
	index: number;
	waypoint: Waypoint | HolonomicWaypoint;
};

export type TWaypointInfoProps = TWaypointProps & {
	show: boolean;
	onClose: () => void;
	setWaypoint: (index: number, value: any) => void;
};
