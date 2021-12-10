import { Waypoint } from 'path-generator';
import { ControlPosition } from 'react-draggable';
import Coord from 'path-generator/lib/motionProfiling/coord';
import HolonomicWaypoint from 'path-generator/lib/waypoints/holonomic-waypoint';

export type TRobotProps = { position: ControlPosition & { angle: number } };
export type TFiledProps = { filedImageUrl: string };
export type TSimulationViewProps = TFiledProps & {};
export type TPathProps = { coords: Coord[] };

export type TWaypointProps = {
	index: number;
	waypoint: Waypoint | HolonomicWaypoint;
};

export type TWaypointInfoProps = TWaypointProps & {
	show: boolean;
	onClose: () => void;
	setWaypoint: (index: number, value: any) => void;
};
