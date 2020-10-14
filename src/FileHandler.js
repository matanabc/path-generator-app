import { r2d } from "./path-generator/util";

function pathToCSV(path) {
    var csv = "Left Position,Right Position,Left Velocity,Right Velocity,Left Acc,Right Acc,Angle,X,Y \n";
    for (let i = 0; i < path.sourceSetpoints.length; i++) {
        const left = path.leftSetpoints[i];
        const right = path.rightSetpoints[i];
        const source = path.sourceSetpoints[i];
        const angleR = left.position - right.position;
        const angleD = r2d(angleR) / path.robotConfig.width;
        csv += `${left.position},${right.position},`;
        csv += `${left.velocity},${right.velocity},`;
        csv += `${left.acceleration},${right.acceleration},`;
        csv += `${angleD},${source.x},${source.y},\n`;
    }
    return csv;
}

export const saveCSV = (path, pathName) => {
    if(path === undefined || pathName === undefined) return;
    const csv = pathToCSV(path);
    const blob = new Blob([csv], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = pathName + '.csv';
    link.href = url;
    link.click();
}