const fmod = (num1, num2) => {
    return (num1 - (Math.floor(num1 / num2) * num2));
}

export const boundRadians = (angle) => {
    var newAngle = fmod(angle, Math.PI * 2);
    if (newAngle < 0) newAngle = Math.PI * 2 + newAngle;
    return newAngle;
}

export const d2r = (angleInDegrees) => {
    return angleInDegrees * Math.PI / 180
};

export const r2d = (angleInRads) => {
    return angleInRads * 180 / Math.PI
};