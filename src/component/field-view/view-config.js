export class FieldConfig {
	constructor(
		widthInMeter = 16.5354,
		heightInMeter = 8.001,
		topLeftXPixel = 0,
		topLeftYPixel = 0,
		widthInPixel = 0,
		heigthInPixel = 0
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
	constructor(width = 0, length = 0, center = 0) {
		this.center = Number(center);
		this.length = Number(length);
		this.width = Number(width);
	}
}
