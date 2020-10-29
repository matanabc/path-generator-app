import { boundRadians } from "./util";
import Segment from "./segment";
import { d2r } from "./util";

class Spline {
    constructor(startPoint, endPoint, pathConfig) {
        this.pathConfig = pathConfig;
        this.nextSplineStartTime = 0;
        this.startPoint = startPoint;
        this.sampleCount = 100000;
        this.endPoint = endPoint;
        this.setpoints = [];
        this.isLegal = true;
        this.segmets = [];
        this.error = "";

        this.fit_hermite_cubic();
        this.calculateDistance();
        this.setVellAndAcc();
        this.checkIfLegal();
    }

    getVMax() {
        return Math.min(
            Math.sqrt(((2 * this.arc_length * this.acc * this.acc) +
                (this.V0 * this.V0 * this.acc) + (this.vEnd * this.vEnd * this.acc)) /
                (this.acc + this.acc)).toFixed(2),
            Math.abs(this.pathConfig.vMax)
        );
    }

    setVellAndAcc() {
        this.acc = Math.abs(this.pathConfig.acc);
        this.V0 = Math.min(Math.abs(this.startPoint.v), Math.abs(this.pathConfig.vMax));
        this.vEnd = Math.min(Math.abs(this.endPoint.v), Math.abs(this.pathConfig.vMax));
        this.vMax = Math.min(Math.abs(this.startPoint.vMax), this.getVMax());
    }

    fit_hermite_cubic() {
        this.checkIfLegal();
        if (!this.isLegal) return;
        this.knot_distance = Math.sqrt((this.endPoint.x - this.startPoint.x) * (this.endPoint.x - this.startPoint.x) +
            (this.endPoint.y - this.startPoint.y) * (this.endPoint.y - this.startPoint.y));
        this.angle_offset = Math.atan2(this.endPoint.y - this.startPoint.y, this.endPoint.x - this.startPoint.x);

        const startAngle = this.startPoint.angle === "-" ? 0 : this.startPoint.angle;
        const endAngle = this.endPoint.angle === "-" ? 0 : this.endPoint.angle;
        const a0_delta = Math.tan(boundRadians(d2r(startAngle) - this.angle_offset));
        const a1_delta = Math.tan(boundRadians(d2r(endAngle) - this.angle_offset));

        this.a = 0;
        this.b = 0;
        this.c = (a0_delta + a1_delta) / (this.knot_distance * this.knot_distance);
        this.d = -(2 * a0_delta + a1_delta) / this.knot_distance;
        this.e = a0_delta;

        this.x_offset = this.startPoint.x;
        this.y_offset = this.startPoint.y;
    }

    calculateDistance() {
        this.checkIfLegal();
        if (!this.isLegal) return;
        this.arc_length = 0;
        var t = 0, dydt = 0, deriv0 = this.deriv(t), integrand = 0;
        var last_integrand = Math.sqrt(1 + deriv0 * deriv0) / this.sampleCount;
        for (let i = 0; i <= this.sampleCount; i = i + 1) {
            t = i / this.sampleCount;
            dydt = this.deriv(t);
            integrand = Math.sqrt(1 + dydt * dydt) / this.sampleCount;
            this.arc_length += (integrand + last_integrand) / 2;
            last_integrand = integrand;
        }
        this.arc_length = this.knot_distance * this.arc_length;
    }

    deriv(percentage) {
        const x = percentage * this.knot_distance;
        return (5 * this.a * x + 4 * this.b) * (x * x * x) +
            (3 * this.c * x + 2 * this.d) * x + this.e;
    }

    calculateSegmets() {
        this.checkIfLegal();
        if (!this.isLegal) return;
        const speeding2vMax = new Segment(this.V0, this.vMax, this.acc);
        const slowing2vEnd = new Segment(this.vMax, this.vEnd, this.acc);
        const speedingAndSlowingDistance = speeding2vMax.distance + slowing2vEnd.distance;
        this.segmets.push(speeding2vMax);
        this.segmets.push(new Segment(this.vMax, this.arc_length - speedingAndSlowingDistance));
        this.segmets.push(slowing2vEnd);
    }

    calculateSetpoints(startTime) {
        var lastPos = 0, time = startTime;
        for (let i = 0; i < this.segmets.length; i++) {
            if (this.segmets[i].distance === 0) continue;
            for (; time < this.segmets[i].totalTime; time += this.pathConfig.robotLoopTime)
                this.setpoints.push(this.segmets[i].getSetpoint(time, lastPos));
            lastPos += this.segmets[i].distance;
            time = time - this.segmets[i].totalTime;
        }
        this.nextSplineStartTime = time;
    }

    calculateSetpointsCoords(startPosition) {
        for (let i = 0; i < this.setpoints.length; i++) {
            const coords = this.getCoords(this.setpoints[i].position);
            this.setpoints[i].heading = coords.angle;
            this.setpoints[i].x = coords.x;
            this.setpoints[i].y = coords.y;
            this.setpoints[i].position += startPosition;
        }
    }

    getCoords(pos_relative) {
        const percentage = Math.max(Math.min(this.getProgressForDistance(pos_relative), 1), 0);
        const x = percentage * this.knot_distance;
        const y = (this.a * x + this.b) * (x * x * x * x) +
            (this.c * x + this.d) * (x * x) + this.e * x;

        const cos_theta = Math.cos(this.angle_offset);
        const sin_theta = Math.sin(this.angle_offset);

        return {
            x: x * cos_theta - y * sin_theta + this.x_offset,
            y: x * sin_theta + y * cos_theta + this.y_offset,
            angle: boundRadians(Math.atan(this.deriv(percentage)) + this.angle_offset)
        };
    }

    getProgressForDistance(distance) {
        return distance / this.arc_length;
    }

    checkIfLegal() {
        if (this.startPoint.vMax === 0) {
            this.isLegal = false;
            this.error = `Can't create spline because vMax is equal to 0!\n` +
                `You need to increase vMax!\n`;
        }

        if (this.vMax < this.vEnd) {
            this.isLegal = false;
            this.error = `Can't get from v0 (${this.V0}) to vEnd (${this.vEnd}) because vMax` +
                `(${this.vMax}) is smaller then vEnd (${this.vEnd})!\n` +
                `You need to decrease vEnd or increase vMax!\n` +
                `Try using vEnd ${this.vMax} or vMax ${this.getVMax()}!`;
        }

        if (new Segment(this.V0, this.vEnd, this.acc).distance > this.arc_length) {
            const v = Math.sqrt(Math.pow(this.V0, 2) + 2 * this.acc * this.arc_length).toFixed(3);
            this.isLegal = false;
            this.error = `Can't get from v0 (${this.V0}) to vEnd (${this.vEnd})!` +
                `You need to decrease vEnd!\n` +
                `Try using vEnd ${v}!`;
        }
    }
}

export default Spline;