import { Waypoint } from 'path-generator';
import Coord from 'path-generator/lib/motionProfiling/coord';
import HolonomicWaypoint from 'path-generator/lib/waypoints/holonomic-waypoint';

export type TFiledProps = { filedImageUrl: string };
export type TSimulationViewProps = TFiledProps & {};
export type TPathProps = { coords: Coord[] };
export type TWaypointProps = {
	index: number;
	waypoint: Waypoint | HolonomicWaypoint;
};
