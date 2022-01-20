import HolonomicWaypoint from 'path-generator/lib/waypoints/holonomic-waypoint';
import Coord from 'path-generator/lib/motionProfiling/coord';
import { Waypoint } from 'path-generator';

type TCoords = { coords: Coord[] };
type TTopLeft = {
	topLeftX: number;
	topLeftY: number;
};
type TFiledInPixel = {
	widthInPixel: number;
	heightInPixel: number;
};
type TFiledInMeter = {
	widthInMeter: number;
	heightInMeter: number;
};
type TWaypoint = TFiledInMeter & {
	index: number;
	robotVMax: number;
	waypoint: Waypoint | HolonomicWaypoint;
};

export type TViewProps = TCoords;
export type TPathProps = TTopLeft & TCoords;
export type TRobotProps = TTopLeft &
	TCoords & {
		robotPosition: number;
		setRobotPosition: (value: number) => void;
		waypoints: Waypoint[] | HolonomicWaypoint[];
	};
export type TFiledProps = TTopLeft &
	TFiledInPixel & {
		image: string;
		projectFolder: string;
		updateFieldStore: (value: any) => void;
	};
export type TWaypointProps = TWaypoint &
	TFiledInPixel &
	TTopLeft & {
		removeWaypoint: (index: number) => void;
		setWaypoint: (index: number, value: any) => void;
		setRobotPosition: (robotPosition: number) => void;
		addWaypoint: (index: number, waypoint?: Object | undefined) => void;
	};
export type TWaypointInfoProps = TWaypoint & {
	show: boolean;
	onClose: () => void;
	setWaypoint: (index: number, value: any) => void;
};
