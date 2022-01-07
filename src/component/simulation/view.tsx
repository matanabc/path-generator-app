import { Holonomic, PathConfig, Tank } from 'path-generator';

import { useGenerateStore, useRobotStore } from '../../store';
import { DriveTypeOption } from '../../common/enums';
import { Field, Path, Robot, Waypoint } from '.';

export const createPath = ({ paths, selected = '' }: any, { pathConfig, driveType }: any) => {
	const { vMax, acc, width, length, robotLoopTime } = pathConfig;
	const _pathConfig = new PathConfig(vMax, acc, width, length, robotLoopTime);
	const waypoints = paths[selected] || [];
	if (waypoints.length === 0) return { coords: [] };
	if (DriveTypeOption.Holonomic === driveType) return new Holonomic.Path(waypoints, _pathConfig);
	return new Tank.Path(waypoints, _pathConfig);
};

const getWaypointsElements = (waypoints: [], selected: string) =>
	[...waypoints]
		.reverse()
		.map((waypoint: any, index: number) => (
			<Waypoint key={`${selected}-${index}`} index={waypoints.length - 1 - index} waypoint={waypoint} />
		));

export default function View() {
	const { coords } = createPath(useGenerateStore(), useRobotStore());
	const selected = useGenerateStore((state) => state.selected) || '';
	const waypoints = useGenerateStore((state) => state.paths[selected]) || [];

	return (
		<>
			<Field />
			<Path coords={coords} />
			<Robot />
			{getWaypointsElements(waypoints, selected)}
		</>
	);
}
