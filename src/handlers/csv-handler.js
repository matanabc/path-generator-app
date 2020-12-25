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

export function getCoordsCSV(path) {
	const csvLines = path.coords.map((coord) => {
		return getCoordCSV(coord);
	});
	return getCoordCSV() + csvLines.join('\n');
}

function getCoordCSV(coord) {
	if (!coord) return 'Angle,X,Y,\n';
	return `${Util.r2d(coord.angle)},${coord.x},${coord.y},`;
}
