import shallow from 'zustand/shallow';

import { createPathSelector } from '../../util';
import { TSimulationViewProps } from './types';
import { usePathStore } from '../../store';
import Waypoint from './waypoint';
import Field from './field';
import Path from './path';
import './view.css';

export default function View({ filedImageUrl }: TSimulationViewProps) {
	const path = usePathStore(createPathSelector, shallow);
	const selected = usePathStore((state) => state.selected) || '';
	const waypoints = usePathStore((state) => state.paths[selected]) || [];

	return (
		<>
			<Field filedImageUrl={filedImageUrl} />
			<Path coords={path.coords} />
			{[...waypoints].reverse().map((waypoint: any, index: number) => (
				<Waypoint key={`${selected}-${index}`} index={waypoints.length - 1 - index} waypoint={waypoint} />
			))}
		</>
	);
}
