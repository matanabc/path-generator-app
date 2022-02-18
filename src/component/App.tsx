import { Holonomic, Path, PathConfig, Tank } from 'path-generator';

import { useGenerateStore, useRobotStore } from '../store';
import { DriveTypeOption } from '../common/enums';
import { View } from './simulation';
import { Loader } from './loader';
import { Slider } from './slider';
import { Tools } from './tools';
import './app.css';

const createPath = ({ paths, selected = '' }: any, { pathConfig, driveType }: any): Path => {
	const { vMax, acc, width, length, robotLoopTime } = pathConfig;
	const _pathConfig = new PathConfig(vMax, acc, width, length, robotLoopTime);
	const waypoints = paths[selected] || [];
	if (waypoints.length === 0) return new Path([], _pathConfig);
	if (DriveTypeOption.Holonomic === driveType) return new Holonomic.Path(waypoints, _pathConfig);
	return new Tank.Path(waypoints, _pathConfig);
};

export default function App() {
	const path = createPath(useGenerateStore(), useRobotStore());

	return (
		<div className='App'>
			<View coords={path.coords} />
			<Slider coords={path.coords} />
			<Tools path={path} />
			<Loader />
		</div>
	);
}
