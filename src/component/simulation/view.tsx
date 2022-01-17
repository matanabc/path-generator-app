import { Holonomic, PathConfig, Tank } from 'path-generator';

import { useFieldStore, useFilesStore, useGenerateStore, useRobotStore } from '../../store';
import { DriveTypeOption } from '../../common/enums';
import { Field, Path, Robot, Waypoint } from '.';

const createPath = ({ paths, selected = '' }: any, { pathConfig, driveType }: any) => {
	const { vMax, acc, width, length, robotLoopTime } = pathConfig;
	const _pathConfig = new PathConfig(vMax, acc, width, length, robotLoopTime);
	const waypoints = paths[selected] || [];
	if (waypoints.length === 0) return { coords: [] };
	if (DriveTypeOption.Holonomic === driveType) return new Holonomic.Path(waypoints, _pathConfig);
	return new Tank.Path(waypoints, _pathConfig);
};

export default function View() {
	const fieldStore = useFieldStore();
	const robotStore = useRobotStore();
	const generateStore = useGenerateStore();
	const { projectFolder } = useFilesStore();

	const { updateFieldStore } = fieldStore;
	const selected = generateStore.selected || '';
	const waypoints = generateStore.paths[selected] || [];
	const { coords } = createPath(generateStore, robotStore);
	const { robotPosition, pathConfig, setRobotPosition } = robotStore;
	const { setWaypoint, addWaypoint, removeWaypoint } = generateStore;
	const { image, topLeftX, topLeftY, widthInPixel, heightInPixel, widthInMeter, heightInMeter } = fieldStore;

	return (
		<>
			<Field
				image={image}
				topLeftX={topLeftX}
				topLeftY={topLeftY}
				widthInPixel={widthInPixel}
				heightInPixel={heightInPixel}
				projectFolder={projectFolder}
				updateFieldStore={updateFieldStore}
			/>
			<Path coords={coords} topLeftX={topLeftX} topLeftY={topLeftY} />
			<Robot
				coords={coords}
				topLeftX={topLeftX}
				topLeftY={topLeftY}
				waypoints={waypoints}
				robotPosition={robotPosition}
				setRobotPosition={setRobotPosition}
			/>
			{[...waypoints].reverse().map((waypoint: any, index: number) => (
				<Waypoint
					waypoint={waypoint}
					topLeftX={topLeftX}
					topLeftY={topLeftY}
					setWaypoint={setWaypoint}
					addWaypoint={addWaypoint}
					widthInPixel={widthInPixel}
					robotVMax={pathConfig.vMax}
					widthInMeter={widthInMeter}
					key={`${selected}-${index}`}
					heightInMeter={heightInMeter}
					heightInPixel={heightInPixel}
					removeWaypoint={removeWaypoint}
					setRobotPosition={setRobotPosition}
					index={waypoints.length - 1 - index}
				/>
			))}
		</>
	);
}
