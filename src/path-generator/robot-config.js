class robotConfig {
    constructor(a, b, c, d) {
        if (b === undefined)
            this.constructorA(a);
        else
            this.constructorB(a, b, c, d);
    }

    constructorA(config) {
        this.width = config.width ? config.width : 0.6;
        this.vMax = config.vMax ? config.vMax : 0.6;
        this.acc = config.acc ? config.acc : 0.6;
        this.robotLoopTime = config.robotLoopTime ? config.robotLoopTime : 0.02;
    }

    constructorB(width = 0.6, vMax = 1, acc = 1, robotLoopTime = 0.02) {
        this.width = width;
        this.vMax = vMax;
        this.acc = acc;
        this.robotLoopTime = robotLoopTime;
    }
}

export default robotConfig;