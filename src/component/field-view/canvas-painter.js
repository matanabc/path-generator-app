import { Holonomic } from 'path-generator';
import { d2r } from 'path-generator/lib/util';

export function drawOnCanvas(canvas, props) {
	const ctx = canvas.getContext('2d');
	ctx.lineWidth = 5;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFieldBorders(ctx, props);

	if (!props.path) return;
	if (props.path.isIllegal() || props.path.coords.length === 0) {
		drawWaypoints(ctx, props);
		return;
	}

	drawCoords(ctx, props);
	if (props.isPathMode) drawWaypoints(ctx, props);
	if (props.drawRobotInterval !== undefined || props.rangePosition > 0 || !props.isPathMode)
		drawRobotFromCoord(ctx, props);
}

function drawFieldBorders(ctx, props) {
	ctx.beginPath();
	ctx.rect(
		props.fieldConfig.topLeftXPixel,
		props.fieldConfig.topLeftYPixel,
		props.fieldConfig.widthInPixel,
		props.fieldConfig.heigthInPixel
	);
	ctx.strokeStyle = 'blue';
	ctx.stroke();
}

function drawWaypoints(ctx, props) {
	props.path.waypoints.forEach((waypoint, index) => {
		const x = waypoint.x / props.fieldConfig.widthPixelToMeter + props.fieldConfig.topLeftXPixel;
		const y = waypoint.y / props.fieldConfig.hightPixelToMeter + props.fieldConfig.topLeftYPixel;
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, Math.PI * 2, false);
		if (props.selectedWaypoint === index) ctx.fillStyle = 'blue';
		else ctx.fillStyle = 'red';
		ctx.fill();
		if (index === props.selectedWaypoint)
			drawRobot(ctx, props, x, y, props.driveType === Holonomic ? waypoint.robotAngle : waypoint.angle);
	});
}

function drawCoords(ctx, props) {
	ctx.beginPath();
	props.path.coords.forEach((setpoint, index) => {
		if (!props.isPathMode && index > props.rangePosition) return;
		const x = setpoint.x / props.fieldConfig.widthPixelToMeter + props.fieldConfig.topLeftXPixel;
		const y = setpoint.y / props.fieldConfig.hightPixelToMeter + props.fieldConfig.topLeftYPixel;
		if (index === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	});
	ctx.strokeStyle = 'Yellow';
	ctx.stroke();
}

function drawRobotFromCoord(ctx, props) {
	const index = props.rangePosition;
	const coord = props.path.coords[index];
	const robotX = coord.x / props.fieldConfig.widthPixelToMeter + props.fieldConfig.topLeftXPixel;
	const robotY = coord.y / props.fieldConfig.hightPixelToMeter + props.fieldConfig.topLeftYPixel;
	drawRobot(ctx, props, robotX, robotY, coord.angle);
}

function drawRobot(ctx, props, x, y, angle) {
	const robotInReverse = props.isPathInReverse ? -1 : 1;
	const robotLength = props.robotDrawConfig.length / props.fieldConfig.widthPixelToMeter;
	const robotBorder = (props.robotDrawConfig.width * 0.6) / props.fieldConfig.hightPixelToMeter;
	const robotCenter = (robotInReverse * props.robotDrawConfig.center) / props.fieldConfig.widthPixelToMeter;

	ctx.beginPath();
	ctx.save();
	drawRobotShape(ctx, props, robotLength, robotCenter, x, y, d2r(angle));
	drawRobotCenter(ctx);
	drawRobotBorders(ctx, robotInReverse, robotLength, robotCenter, robotBorder, 'blue');
	drawRobotBorders(ctx, robotInReverse, -robotLength, robotCenter, robotBorder, 'red');
	ctx.restore();
}

function drawRobotShape(ctx, props, robotLength, robotCenter, x, y, angle) {
	const robotWidth = props.robotDrawConfig.width / props.fieldConfig.hightPixelToMeter;
	const robotX = x - robotLength / 2;
	const robotY = y - robotWidth / 2;

	ctx.translate(robotX + robotLength / 2, robotY + robotWidth / 2);
	ctx.rotate(angle);
	ctx.fillStyle = 'white';
	ctx.fillRect(-robotLength / 2 - robotCenter, -robotWidth / 2, robotLength, robotWidth);
}

function drawRobotCenter(ctx) {
	ctx.arc(0, 0, 5, 0, Math.PI * 2, false);
	ctx.fillStyle = 'blue';
	ctx.fill();
}

function drawRobotBorders(ctx, robotInReverse, robotLength, robotCenter, robotBorder, color) {
	ctx.beginPath();
	ctx.moveTo(robotInReverse * (robotLength / 2) - robotCenter, -robotBorder / 2);
	ctx.lineTo(robotInReverse * (robotLength / 2) - robotCenter, robotBorder / 2);
	ctx.strokeStyle = color;
	ctx.stroke();
}
