export function drawOnCanvas(canvas, props) {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (!props.path) return;

	drawFieldBorders(ctx, props);
	drawCoords(ctx, props);
	drawWaypoints(ctx, props);
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
	props.path.waypoints.forEach((waypoint) => {
		const x = waypoint.x / props.fieldConfig.widthPixelToMeter + props.fieldConfig.topLeftXPixel;
		const y = waypoint.y / props.fieldConfig.hightPixelToMeter + props.fieldConfig.topLeftYPixel;
		ctx.beginPath();
		ctx.arc(x, y, 2, 0, Math.PI * 2, false);
		ctx.fillStyle = 'red';
		ctx.fill();
	});
}

function drawCoords(ctx, props) {
	ctx.beginPath();
	props.path.coords.forEach((setpoint, index) => {
		const x = setpoint.x / props.fieldConfig.widthPixelToMeter + props.fieldConfig.topLeftXPixel;
		const y = setpoint.y / props.fieldConfig.hightPixelToMeter + props.fieldConfig.topLeftYPixel;
		if (index === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	});
	ctx.strokeStyle = 'Yellow';
	ctx.stroke();
}
