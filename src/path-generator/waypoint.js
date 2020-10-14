class Waypoint {
    constructor(x = 0, y = 0, angle = 0, v = 0, vMax = 2) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.v = v;
        this.vMax = vMax;
    }
}

export default Waypoint;