import Spline from "./spline";
import { tank } from "./modifier";

class Generator {
    constructor(waypoints, robotConfig) {
        this.isLegal = { legal: true };
        this.robotConfig = robotConfig;
        this.waypoints = waypoints;
        this.sourceSetpoints = [];
        this.leftSetpoints = [];
        this.rightSetpoints = [];
        this.generatePath();
    }

    generatePath() {
        if (this.waypoints.length < 2) {
            this.isLegal = {
                legal: false,
                error: "Path need to have 2 waypoints or more!",
            }
            return;
        }
        this.splines = [];
        for (let i = 0; i < this.waypoints.length - 1; i++) {
            this.splines[i] = new Spline(this.waypoints[i], this.waypoints[i + 1], this.robotConfig);
            if (!this.splines[i].isLegal.legal) return;
        }
        this.sourceSetpoints = this.getSetpoints(this.splines);
        const tankSetpoints = tank(this.sourceSetpoints, this.robotConfig);
        this.leftSetpoints = tankSetpoints.left;
        this.rightSetpoints = tankSetpoints.right;
    }

    getSetpoints(splines) {
        var nextStartTime = 0, lastPosition = 0;
        var totalSetpoints = [];
        for (let i = 0; i < splines.length; i++) {
            splines[i].calculateSegmets();
            if (!splines[i].isLegal.legal) break;
            splines[i].calculateSetpoints(nextStartTime);
            splines[i].calculateSetpointsCoords(lastPosition);
            nextStartTime = splines[i].nextSplineStartTime;
            lastPosition += splines[i].arc_length;
            totalSetpoints = totalSetpoints.concat(splines[i].setpoints);
        }
        return totalSetpoints;
    }
}

export default Generator;