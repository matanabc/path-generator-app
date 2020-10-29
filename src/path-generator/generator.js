import Spline from "./spline";
import { tank } from "./modifier";

class Generator {
    constructor(waypoints, pathConfig) {
        this.pathConfig = pathConfig;
        this.waypoints = waypoints;
        this.sourceSetpoints = [];
        this.rightSetpoints = [];
        this.leftSetpoints = [];
        this.splineError = "";
        this.isLegal = true;
        this.error = "";

        this.generatePath();
    }

    generatePath() {
        if (this.waypoints.length < 2) return;
        this.splines = [];
        for (let i = 0; i < this.waypoints.length - 1; i++) {
            this.splines[i] = new Spline(this.waypoints[i], this.waypoints[i + 1], this.pathConfig);
            if (!this.splines[i].isLegal) {
                this.isLegal = false;
                this.error = `Spline ${i + 1} (Waypoint ${i + 1} and ${i + 2}) is illegal!`;
                this.splineError = this.splines[i].error;
                break;
            };
        }
        this.sourceSetpoints = this.getSetpoints(this.splines);
        const tankSetpoints = tank(this.sourceSetpoints, this.pathConfig);
        this.leftSetpoints = tankSetpoints.left;
        this.rightSetpoints = tankSetpoints.right;
    }

    getSetpoints(splines) {
        var nextStartTime = 0, lastPosition = 0;
        var totalSetpoints = [];
        for (let i = 0; i < splines.length; i++) {
            splines[i].calculateSegmets();
            if (!splines[i].isLegal) break;
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