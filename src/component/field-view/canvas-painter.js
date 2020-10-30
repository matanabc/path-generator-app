import { TankModifier, PathConfig } from "../../path-generator/path-generator";
import { d2r } from "../../path-generator/util";

export const drawOnCanvas = (canvas, props) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (props.fieldConfig === undefined) return;
    if (props.filedImage === undefined) {
        drawImageNotFound(ctx, props);
        return;
    };
    if (props.paths.length === 0) return;
    if (!props.path) return;

    drawFieldBorders(ctx, props);
    drawWaypoints(ctx, props);
    drawSetpoints(ctx, props);
    drawRobot(ctx, props);
    drawPathTime(ctx, props);
}

function drawImageNotFound(ctx, props) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillText(`Can't find image ${props.fieldConfig.imageName}`, 5, 12);
}

function drawFieldBorders(ctx, props) {
    ctx.beginPath();
    ctx.rect(props.fieldConfig.topLeftXPixel, props.fieldConfig.topLeftYPixel,
        props.fieldConfig.widthInPixel, props.fieldConfig.heigthInPixel);
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

function drawWaypoints(ctx, props) {
    props.paths[props.pathID].waypoints.forEach(waypoint => {
        const x = waypoint.x / props.fieldConfig.widthPixelToMeter + props.fieldConfig.topLeftXPixel;
        const y = waypoint.y / props.fieldConfig.hightPixelToMeter + props.fieldConfig.topLeftYPixel;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
    });
}

function drawSetpoints(ctx, props) {
    if (props.path.isTurnInPlace) return;
    ctx.beginPath();
    const config = new PathConfig(props.robotDrawConfig.width, 0, 0);
    const tankModifier = TankModifier(props.path, config);
    tankModifier.left.forEach((setpoint, index) => {
        const x = setpoint.x / props.fieldConfig.widthPixelToMeter + props.fieldConfig.topLeftXPixel;
        const y = setpoint.y / props.fieldConfig.hightPixelToMeter + props.fieldConfig.topLeftYPixel;
        if (index === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);
    });
    tankModifier.right.forEach((setpoint, index) => {
        const x = setpoint.x / props.fieldConfig.widthPixelToMeter + props.fieldConfig.topLeftXPixel;
        const y = setpoint.y / props.fieldConfig.hightPixelToMeter + props.fieldConfig.topLeftYPixel;
        if (index === 0)
            ctx.moveTo(x, y);
        else
            ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "Yellow";
    ctx.stroke();
}

function drawPathTime(ctx, props) {
    const pathSetpointLength = props.path.sourceSetpoints.length;
    const robotLoopTime = props.pathConfig.robotLoopTime;
    var pathTotalTime = 0;
    if (props.rangePosition > 0)
        pathTotalTime = ((props.rangePosition + 1) * robotLoopTime).toFixed(2);
    else
        pathTotalTime = (pathSetpointLength * robotLoopTime).toFixed(2);
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    ctx.fillRect(4, 3, 21.5, 10);
    ctx.fillStyle = "white";
    ctx.fillText(`${pathTotalTime}`, 5, 12);
}

function getRobotCoord(setpoint, fieldConfig, robotLength, robotWidth) {
    return {
        x: (setpoint.x / fieldConfig.widthPixelToMeter) - (robotLength / 2) + fieldConfig.topLeftXPixel,
        y: (setpoint.y / fieldConfig.hightPixelToMeter) - (robotWidth / 2) + fieldConfig.topLeftYPixel,
    };
}

function getRobotAngle(path, setpoint) {
    if (path.isTurnInPlace)
        return d2r(path.turnStartAngle) + (setpoint.position) / path.pathConfig.width * 2;
    else
        return setpoint.heading;
}

function drawRobot(ctx, props) {
    const setpoint = props.path.sourceSetpoints[props.rangePosition];
    if (setpoint === undefined) return;
    const robotInReverse = props.paths[props.pathID].isInReverse ? -1 : 1;
    const robotLength = Number(props.robotDrawConfig.length) / props.fieldConfig.widthPixelToMeter;
    const robotWidth = Number(props.robotDrawConfig.width) / props.fieldConfig.hightPixelToMeter;
    const robotWayWidth = Number(props.robotDrawConfig.width * 0.6) / props.fieldConfig.hightPixelToMeter;
    const robotCenter = robotInReverse * Number(props.robotDrawConfig.center) / props.fieldConfig.widthPixelToMeter;
    var robotCoord = getRobotCoord(setpoint, props.fieldConfig, robotLength, robotWidth);
    if (props.path.isTurnInPlace)
        robotCoord = getRobotCoord(props.path.sourceSetpoints[0], props.fieldConfig, robotLength, robotWidth);

    ctx.beginPath();
    ctx.save();
    ctx.translate(robotCoord.x + (robotLength / 2), robotCoord.y + (robotWidth / 2));
    ctx.rotate(getRobotAngle(props.path, setpoint));
    ctx.fillStyle = "white";
    ctx.fillRect((-robotLength / 2) - robotCenter, (-robotWidth / 2), robotLength, robotWidth);

    ctx.arc(robotCenter, 0, 1.5, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgb(50, 100, 0)";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo((robotInReverse * (robotLength / 2) - robotCenter), (-robotWayWidth / 2));
    ctx.lineTo((robotInReverse * (robotLength / 2) - robotCenter), (robotWayWidth / 2));
    ctx.strokeStyle = "blue";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((robotInReverse * (-robotLength / 2) - robotCenter), (-robotWayWidth / 2));
    ctx.lineTo((robotInReverse * (-robotLength / 2) - robotCenter), (robotWayWidth / 2));
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.restore();
}