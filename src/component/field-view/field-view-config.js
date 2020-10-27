export class FieldConfig {
    constructor(a, b, c, d, e, f, g) {
        if (a === undefined || b !== undefined)
            this.constructorA(a, b, c, d, e, f, g);
        else
            this.constructorB(a);
    }

    constructorA(imageName, widthInMeter = 16.5354, heightInMeter = 8.001,
        topLeftXPixel = 0, topLeftYPixel = 0, widthInPixel = 0, heigthInPixel = 0) {
        this.imageName = imageName;
        this.widthInMeter = Number(widthInMeter);
        this.heightInMeter = Number(heightInMeter);
        this.topLeftXPixel = Number(topLeftXPixel);
        this.topLeftYPixel = Number(topLeftYPixel);
        this.widthInPixel = Number(widthInPixel);
        this.heigthInPixel = Number(heigthInPixel);

        this.widthPixelToMeter = widthInPixel === 0 ? 0 : (widthInMeter) / (widthInPixel);
        this.hightPixelToMeter = heigthInPixel === 0 ? 0 : (heightInMeter) / (heigthInPixel);
    }

    constructorB(config) {
        this.imageName = config.imageName ? config.imageName : "";
        this.widthInMeter = config.widthInMeter ? Number(config.widthInMeter) : 16.5354;
        this.heightInMeter = config.heightInMeter ? Number(config.heightInMeter) : 8.001;
        this.topLeftXPixel = config.topLeftXPixel ? Number(config.topLeftXPixel) : 0;
        this.topLeftYPixel = config.topLeftYPixel ? Number(config.topLeftYPixel) : 0;
        this.widthInPixel = config.widthInPixel ? Number(config.widthInPixel) : 0;
        this.heigthInPixel = config.heigthInPixel ? Number(config.heigthInPixel) : 0;

        this.widthPixelToMeter = config.widthInPixel === 0 ? 0 : (config.widthInMeter) / (config.widthInPixel);
        this.hightPixelToMeter = config.heigthInPixel === 0 ? 0 : (config.heightInMeter) / (config.heigthInPixel);
    }
}

export class RobotDrawConfig {
    constructor(width = 0.8, length = 1.2, center = 0) {
        this.center = center;
        this.length = length;
        this.width = width;
        this.drawRobotInterval = undefined;
    }
}