import { useGenerateStore, useRobotStore } from '../store';
import { Field, Path, Waypoint } from './simulation';
import { createPath } from '../common/util';
import Robot from './simulation/robot';
import { Loader } from './loader';
import { Tools } from './tools';
import './app.css';

const getWaypointsElements = (waypoints: [], selected: string) =>
	[...waypoints]
		.reverse()
		.map((waypoint: any, index: number) => (
			<Waypoint key={`${selected}-${index}`} index={waypoints.length - 1 - index} waypoint={waypoint} />
		));

export default function App() {
	const path = createPath(useGenerateStore(), useRobotStore());
	const selected = useGenerateStore((state) => state.selected) || '';
	const waypoints = useGenerateStore((state) => state.paths[selected]) || [];

	return (
		<div className='App'>
			<Field />
			<Path coords={path.coords} />
			<Robot />
			{getWaypointsElements(waypoints, selected)}

			<Tools />
			<Loader />
		</div>
	);
}
