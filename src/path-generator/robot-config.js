class robotConfig {
    constructor(width = 0.6, vMax = 1, acc = 1, robotLoopTime = 0.02) {
        this.width = width;
        this.vMax = vMax;
        this.acc = acc;
        this.robotLoopTime = robotLoopTime;
    }
}

export default robotConfig;