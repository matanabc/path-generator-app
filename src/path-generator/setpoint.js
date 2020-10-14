class Setpoint {
    constructor(a, b, c, d, e, f, g) {
        if (b === undefined)
            this.constructorA(a);
        else
            this.constructorB(a, b, c, d, e, f, g);

    }

    constructorA(setpoint) {
        this.x = setpoint.x;
        this.y = setpoint.y;
        this.heading = setpoint.heading;
        this.position = setpoint.position;
        this.velocity = setpoint.velocity;
        this.acceleration = setpoint.acceleration;
        this.time = setpoint.time;
    }

    constructorB(x, y, heading, position, velocity, acceleration, time) {
        this.x = x;
        this.y = y;
        this.heading = heading;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.time = time;
    }
}

export default Setpoint;