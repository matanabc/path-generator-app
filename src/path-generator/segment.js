import Setpoint from "./setpoint";

class Segment {
    constructor(a, b, c) {
        if (c === undefined)
            this.constructorB(a, b);
        else
            this.constructorA(a, b, c);
    }

    constructorA(V0, Ve, acc) {
        this.V0 = V0;
        this.Ve = Ve;
        this.acc = V0 < Ve ? acc : -acc;
        this.totalTime = Math.abs((Ve - V0) / acc);
        this.distance = this.getPosition(this.totalTime);
    }

    constructorB(V, distance) {
        this.distance = distance;
        this.V0 = V;
        this.Ve = V;
        this.acc = 0;
        this.totalTime = distance / V;
    }

    getSetpoint(time, relativePosition) {
        return new Setpoint(0, 0, 0,
            this.getPosition(time) + relativePosition,
            this.getVelocity(time),
            this.acc, time);
    }

    getPosition(time) {
        return this.V0 * time + 0.5 * this.acc * time * time;
    }

    getVelocity(time) {
        return this.V0 + this.acc * time;
    }
}

export default Segment;