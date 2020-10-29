class PathConfig {
    constructor(a, b, c, d) {
        if (typeof (a) === "object")
            this.constructorA(a);
        else
            this.constructorB(a, b, c, d);
    }

    constructorA(config) {
        this.width = config.width ? config.width : 0.8;
        this.vMax = config.vMax ? config.vMax : 2;
        this.acc = config.acc ? config.acc : 2;
        this.robotLoopTime = config.robotLoopTime ? config.robotLoopTime : 0.02;
    }

    constructorB(width = 0.6, vMax = 2, acc = 2, robotLoopTime = 0.02) {
        this.width = width ? width : 0.8;
        this.vMax = vMax ? vMax : 2;
        this.acc = acc ? acc : 2;
        this.robotLoopTime = robotLoopTime ? robotLoopTime : 0.02;
    }
}

export default PathConfig;