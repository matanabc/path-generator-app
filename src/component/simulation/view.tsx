import { TSimulationViewProps } from './types';
import Field from './field';
import Path from './path';
import './view.css';
import Waypoint from './waypoint';

export default function View({ filedImageUrl }: TSimulationViewProps) {
	return (
		<>
			<Field filedImageUrl={filedImageUrl} />
			<Path />
			<Waypoint index={1} />
		</>
	);
}
