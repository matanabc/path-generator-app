import HolonomicWaypoint from 'path-generator/lib/waypoints/holonomic-waypoint';
import Coord from 'path-generator/lib/motionProfiling/coord';
import { Waypoint } from 'path-generator';

type TCoords = { coords: Coord[] };

export type TViewProps = TCoords;
export type TPathProps = TCoords;

export type TRobotProps = TCoords & {
	waypoints: Waypoint[] | HolonomicWaypoint[];
};

export type TWaypointProps = {
	index: number;
	waypoint: Waypoint | HolonomicWaypoint;
};

export type TWaypointInfoProps = TWaypointProps & {
	show: boolean;
	onClose: () => void;
};
