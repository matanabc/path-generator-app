export function drawOnCanvas(canvas, props) {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFieldBorders(ctx, props);

	if (!props.path) return;
	if (props.path.isIllegal() || props.path.coords.length === 0) {
		drawWaypoints(ctx, props);
		return;
	}

	drawCoords(ctx, props);
	if (props.isPathMode) drawWaypoints(ctx, props);
	drawRobot(ctx, props);
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
		ctx.arc(x, y, 2, 0, Math.PI * 2, false);
		if (props.selectedWaypoint === index) ctx.fillStyle = 'blue';
		else ctx.fillStyle = 'red';
		ctx.fill();
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

function drawRobot(ctx, props) {
	const robotInReverse = props.isPathInReverse ? -1 : 1;
	const robotLength = props.robotDrawConfig.length / props.fieldConfig.widthPixelToMeter;
	const robotBorder = (props.robotDrawConfig.width * 0.6) / props.fieldConfig.hightPixelToMeter;
	const robotCenter = (robotInReverse * props.robotDrawConfig.center) / props.fieldConfig.widthPixelToMeter;

	ctx.beginPath();
	ctx.save();
	drawRobotShape(ctx, props, robotLength, robotCenter);
	drawRobotCenter(ctx);
	drawRobotBorders(ctx, robotInReverse, robotLength, robotCenter, robotBorder, 'blue');
	drawRobotBorders(ctx, robotInReverse, -robotLength, robotCenter, robotBorder, 'red');
	ctx.restore();
}

function drawRobotShape(ctx, props, robotLength, robotCenter) {
	const index = props.rangePosition;
	const robotWidth = props.robotDrawConfig.width / props.fieldConfig.hightPixelToMeter;
	const robotX =
		props.path.coords[index].x / props.fieldConfig.widthPixelToMeter -
		robotLength / 2 +
		props.fieldConfig.topLeftXPixel;
	const robotY =
		props.path.coords[index].y / props.fieldConfig.hightPixelToMeter -
		robotWidth / 2 +
		props.fieldConfig.topLeftYPixel;

	ctx.translate(robotX + robotLength / 2, robotY + robotWidth / 2);
	ctx.rotate(props.path.coords[index].angle);
	ctx.fillStyle = 'white';
	ctx.fillRect(-robotLength / 2 - robotCenter, -robotWidth / 2, robotLength, robotWidth);
}

function drawRobotCenter(ctx) {
	ctx.arc(0, 0, 1.5, 0, Math.PI * 2, false);
	ctx.fillStyle = 'rgb(50, 100, 0)';
	ctx.fill();
}

function drawRobotBorders(ctx, robotInReverse, robotLength, robotCenter, robotBorder, color) {
	ctx.beginPath();
	ctx.moveTo(robotInReverse * (robotLength / 2) - robotCenter, -robotBorder / 2);
	ctx.lineTo(robotInReverse * (robotLength / 2) - robotCenter, robotBorder / 2);
	ctx.strokeStyle = color;
	ctx.stroke();
}
