import { Field, Path, Robot, Waypoint } from '.';
import { useGenerateStore } from '../../store';
import { TViewProps } from './types';

export default function View({ coords }: TViewProps) {
	const generateStore = useGenerateStore();
	const selected = generateStore.selected || '';
	const waypoints = generateStore.paths[selected] || [];

	return (
		<>
			<Field />
			<Path coords={coords} />
			<Robot coords={coords} waypoints={waypoints} />
			{[...waypoints].reverse().map((waypoint: any, index: number) => (
				<Waypoint waypoint={waypoint} key={`${selected}-${index}`} index={waypoints.length - 1 - index} />
			))}
		</>
	);
}
