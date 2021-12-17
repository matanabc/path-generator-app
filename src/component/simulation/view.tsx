import { useGenerateStore, useRobotStore } from '../../store';
import { TSimulationViewProps } from './types';
import { createPath } from '../../util';
import PlayingBar from './playing-bar';
import Waypoint from './waypoint';
import Field from './field';
import Path from './path';
import './view.css';

export default function View({ filedImageUrl }: TSimulationViewProps) {
	const path = createPath(useGenerateStore(), useRobotStore());
	const selected = useGenerateStore((state) => state.selected) || '';
	const waypoints = useGenerateStore((state) => state.paths[selected]) || [];

	return (
		<>
			<Field filedImageUrl={filedImageUrl} />
			<Path coords={path.coords} />
			<PlayingBar coords={path.coords} />
			{[...waypoints].reverse().map((waypoint: any, index: number) => (
				<Waypoint key={`${selected}-${index}`} index={waypoints.length - 1 - index} waypoint={waypoint} />
			))}
		</>
	);
}
