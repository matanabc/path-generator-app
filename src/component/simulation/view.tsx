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

	return (
		<>
			<Field filedImageUrl={filedImageUrl} />
			<Path coords={path.coords} />
			{path.waypoints.map((waypoint, index) => (
				<Waypoint key={waypoint.getInfo()} index={index + 1} waypoint={waypoint} />
			))}
		</>
	);
}
