import shallow from 'zustand/shallow';

import { createPathSelector } from '../../util';
import { TSimulationViewProps } from './types';
import { usePathStore } from '../../store';
import Waypoint from './waypoint';
import Field from './field';
import Path from './path';
import './view.css';

export default function View({ filedImageUrl }: TSimulationViewProps) {
	const waypoints = usePathStore((state) => state.paths[state.selected]) || [];
	const setWaypoint = usePathStore((state) => state.setWaypoint);
	const path = usePathStore(createPathSelector, shallow);

	return (
		<>
			<Field filedImageUrl={filedImageUrl} />
			<Path coords={path.coords} />
			{waypoints.map((waypoint: any, index: number) => (
				<Waypoint key={index} index={index} waypoint={waypoint} setWaypoint={setWaypoint} />
			))}
		</>
	);
}
