export class FieldConfig {
	constructor(
		widthInMeter = 16.5354,
		heightInMeter = 8.001,
		topLeftXPixel = 50,
		topLeftYPixel = 50,
		widthInPixel = 50,
		heigthInPixel = 50
	) {
		this.widthInMeter = Number(widthInMeter);
		this.heightInMeter = Number(heightInMeter);
		this.topLeftXPixel = Number(topLeftXPixel);
		this.topLeftYPixel = Number(topLeftYPixel);
		this.widthInPixel = Number(widthInPixel);
		this.heigthInPixel = Number(heigthInPixel);

		this.widthPixelToMeter = widthInPixel === 0 ? 0 : widthInMeter / widthInPixel;
		this.hightPixelToMeter = heigthInPixel === 0 ? 0 : heightInMeter / heigthInPixel;
	}
}

export class RobotDrawConfig {
	constructor(width = 0.8, length = 1.2, center = 0) {
		this.center = center;
		this.length = length;
		this.width = width;
	}
}
