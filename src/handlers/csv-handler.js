import { r2d } from "../path-generator/util";

export function pathToCSV(path, isInReverse) {
    var csv = "Left Position,Right Position,Left Velocity,Right Velocity,Left Acc,Right Acc,Angle,X,Y, \n";
    if (path.isTurnInPlace)
        csv += turnInPlaceCSV(path);
    else
        csv += tankPathCSV(path, isInReverse);
    return csv;
}

function turnInPlaceCSV(path) {
    var csv = "";
    const way = path.turnWay;
    for (let i = 0; i < path.sourceSetpoints.length; i++) {
        const right = path.rightSetpoints[i];
        const left = path.leftSetpoints[i];
        const source = path.sourceSetpoints[i];
        const x = path.sourceSetpoints[0].x;
        const y = path.sourceSetpoints[0].y;
        const angle = Number(r2d(source.position / path.pathConfig.width * 2) * path.turnWay) + path.turnStartAngle;

        csv += `${left.position * way},${right.position * -way},`;
        csv += `${left.velocity * way},${right.velocity * -way},`;
        csv += `${left.acceleration * way},${right.acceleration * -way},`;
        csv += `${angle},${x},${y},\n`;
    }
    return csv;
}

function tankPathCSV(path, isInReverse) {
    var csv = "";
    const way = isInReverse ? -1 : 1;
    for (let i = 0; i < path.sourceSetpoints.length; i++) {
        const right = isInReverse ? path.leftSetpoints[i] : path.rightSetpoints[i];
        const left = isInReverse ? path.rightSetpoints[i] : path.leftSetpoints[i];
        const source = path.sourceSetpoints[i];
        const x = source.x;
        const y = source.y;
        const angleR = isInReverse ? right.position - left.position : left.position - right.position;
        const angleD = Number(path.waypoints[0].angle) + r2d(angleR) / Number(path.pathConfig.width);

        csv += `${left.position * way},${right.position * way},`;
        csv += `${left.velocity * way},${right.velocity * way},`;
        csv += `${left.acceleration * way},${right.acceleration * way},`;
        csv += `${angleD},${x},${y},\n`;
    }
    return csv;
}