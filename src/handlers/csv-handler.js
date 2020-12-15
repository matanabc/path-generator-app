import { Util } from 'path-generator';

export function pathToCSV(path) {
	return tankPathToCSV(path);
}

function tankPathToCSV(path) {
	var csv = tankSetpointPosition() + tankSetpointVelocity() + tankSetpointAcc() + pathCoord();
	for (let i = 0; i < path.sourceSetpoints.length; i++) {
		const leftSetpoint = path.leftSetpoints[i];
		const rightSetpoint = path.rightSetpoints[i];
		const angle =
			Number(path.waypoints[0].angle) +
			Number(Util.r2d((leftSetpoint.position - rightSetpoint.position) / path.pathConfig.width));
		csv += tankSetpointPosition(leftSetpoint, rightSetpoint);
		csv += tankSetpointVelocity(leftSetpoint, rightSetpoint);
		csv += tankSetpointAcc(leftSetpoint, rightSetpoint);
		csv += pathCoord(path.coords[i], angle);
	}
	return csv;
}

function tankSetpointPosition(leftSetpoint, rightSetpoint) {
	if (!leftSetpoint || !rightSetpoint) return 'Left Position,Right Position,';
	return `${leftSetpoint.position},${rightSetpoint.position},`;
}

function tankSetpointVelocity(leftSetpoint, rightSetpoint) {
	if (!leftSetpoint || !rightSetpoint) return 'Left Velocity,Right Velocity,';
	return `${leftSetpoint.velocity},${rightSetpoint.velocity},`;
}

function tankSetpointAcc(leftSetpoint, rightSetpoint) {
	if (!leftSetpoint || !rightSetpoint) return 'Left Acc,Right Acc,';
	return `${leftSetpoint.acceleration},${rightSetpoint.acceleration},`;
}

function pathCoord(coord, angle) {
	if (!coord) return 'Angle,X,Y,\n';
	return `${angle},${coord.x},${coord.y},\n`;
}
