export function drawOnCanvas(canvas, props) {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFieldBorders(ctx, props);
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
