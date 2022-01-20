import { Holonomic, PathConfig, Tank } from 'path-generator';

import { useGenerateStore, useRobotStore } from '../store';
import { DriveTypeOption } from '../common/enums';
import { View } from './simulation';
import { Loader } from './loader';
import { Tools } from './tools';
import './app.css';

const createPath = ({ paths, selected = '' }: any, { pathConfig, driveType }: any) => {
	const { vMax, acc, width, length, robotLoopTime } = pathConfig;
	const _pathConfig = new PathConfig(vMax, acc, width, length, robotLoopTime);
	const waypoints = paths[selected] || [];
	if (waypoints.length === 0) return { coords: [] };
	if (DriveTypeOption.Holonomic === driveType) return new Holonomic.Path(waypoints, _pathConfig);
	return new Tank.Path(waypoints, _pathConfig);
};

export default function App() {
	const { coords } = createPath(useGenerateStore(), useRobotStore());

	return (
		<div className='App'>
			<View coords={coords} />
			<Tools />
			<Loader />
		</div>
	);
}
