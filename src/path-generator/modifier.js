import Setpoint from "./setpoint";

export const tank = (sourceSetpoints, config) => {
    const leftSetpoints = [], rightSetpoints = [];
    var source, left, right;
    const robotWidth = config.width / 2;
    var cos_angle = 0, sin_angle = 0;
    for (let i = 0; i < sourceSetpoints.length; i++) {
        source = sourceSetpoints[i];
        left = new Setpoint(source);
        right = new Setpoint(source);
        cos_angle = Math.cos(source.heading);
        sin_angle = Math.sin(source.heading);
        left.x = source.x - (robotWidth * sin_angle);
        left.y = source.y + (robotWidth * cos_angle);
        right.x = source.x + (robotWidth * sin_angle);
        right.y = source.y - (robotWidth * cos_angle);
        if (i > 0) {
            calculateTankSideSetpoint(left, leftSetpoints[i - 1], config);
            calculateTankSideSetpoint(right, rightSetpoints[i - 1], config);
        }
        leftSetpoints.push(left);
        rightSetpoints.push(right);
    }

    return {
        left: rightSetpoints,
        right: leftSetpoints,
    }
}

function calculateTankSideSetpoint(sideSetpoint, lastSetpoint, config) {
    var distance = 0, acc;
    distance = Math.sqrt((sideSetpoint.x - lastSetpoint.x) * (sideSetpoint.x - lastSetpoint.x) +
        (sideSetpoint.y - lastSetpoint.y) * (sideSetpoint.y - lastSetpoint.y));
    sideSetpoint.position = lastSetpoint.position + distance;
    sideSetpoint.velocity = distance / config.robotLoopTime;
    acc = (sideSetpoint.velocity - lastSetpoint.velocity) / config.robotLoopTime;
    sideSetpoint.acceleration = Math.abs(acc) > 0 ? acc / Math.abs(acc) * config.acc : 0;
}