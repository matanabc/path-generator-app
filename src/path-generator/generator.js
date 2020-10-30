import Spline from "./spline";
import { tank } from "./modifier";
import { d2r } from "./util";
import Waypoint from "./waypoint";

class Generator {
    constructor(waypoints, pathConfig) {
        this.pathConfig = pathConfig;
        this.waypoints = waypoints;
        this.sourceSetpoints = [];
        this.rightSetpoints = [];
        this.leftSetpoints = [];
        this.splineError = "";
        this.isLegal = true;
        this.splines = [];
        this.error = "";

        this.isTurnInPlace = this.isTurnInPlace();
        this.generatePath();
    }

    isTurnInPlace() {
        if (this.waypoints.length === 2 && this.waypoints[0].x === this.waypoints[1].x &&
            this.waypoints[0].y === this.waypoints[1].y) {
            this.turnAngle = Number(this.waypoints[1].angle - this.waypoints[0].angle);
            const x = this.waypoints[0].x + this.pathConfig.width / 2 * d2r(this.turnAngle);
            const y = this.waypoints[0].y;
            const angle = this.waypoints[0].angle;
            const v = this.waypoints[1].v;
            const vMax = this.waypoints[1].vMax;
            const endWaypoint = new Waypoint(x, y, angle, v, vMax);
            this.splines.push(new Spline(this.waypoints[0], endWaypoint, this.pathConfig));
            return true;
        }
        return false;
    }

    generatePath() {
        if (this.waypoints.length < 2) return;
        for (let i = 0; i < this.waypoints.length - 1; i++) {
            if (this.splines.length > 0 && i === 0) break;
            this.splines.push(new Spline(this.waypoints[i], this.waypoints[i + 1], this.pathConfig));
            if (!this.splines[i].isLegal) {
                this.isLegal = false;
                this.error = `Spline ${i + 1} (Waypoint ${i + 1} and ${i + 2}) is illegal!`;
                this.splineError = this.splines[i].error;
                break;
            };
        }
        this.sourceSetpoints = this.getSetpoints(this.splines);
        const tankSetpoints = tank(this, this.pathConfig);
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