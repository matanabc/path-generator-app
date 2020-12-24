import { Util } from 'path-generator';

export function getSetpointsCSV(setpoints) {
	var setpointKeys = [];
	const csvLines = setpoints.map((setpoint, index) => {
		if (index === 0) setpointKeys = getSetpointKeys(setpoint);
		return getSetpointCSV(setpoint, setpointKeys);
	});
	return `${setpointKeys.join(',')},\n${csvLines.join('\n')}`;
}

function getSetpointKeys(setpoint) {
	return Object.keys(setpoint).sort();
}

function getSetpointCSV(setpoint, keys) {
	const csvLine = keys.map((key) => {
		return setpoint[key];
	});
	return csvLine.join(',') + ',';
}

export function getCoordsCSV(path, keys) {
	const leftSetpoints = path[keys[0]];
	const rightSetpoints = path[keys[1]];
	const robotWidth = path.pathConfig.width;
	const csvLines = path.coords.map((coord, i) => {
		var angle =
			Number(path.waypoints[0].angle) +
			Number(Util.r2d((leftSetpoints[i].position - rightSetpoints[i].position) / robotWidth));
		if (keys.length > 2) angle = Util.r2d(path.coords[i].angle);
		if (Number.isNaN(angle)) angle = 0;
		return getCoordCSV(coord, angle);
	});
	return getCoordCSV() + csvLines.join('\n');
}

function getCoordCSV(coord, angle) {
	if (!coord) return 'Angle,X,Y,\n';
	return `${angle},${coord.x},${coord.y},`;
}
