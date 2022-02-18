import holonomicPath from 'path-generator/lib/path/holonomic-path';
import TankPath from 'path-generator/lib/path/tank-path';

import Export from './export';

export default class PythonExport extends Export {
	protected saveTankPath(path: TankPath): void {
		this.saveToFile(this.getFileData(path), `${this.pathName}.py`);
	}

	protected saveHolonomicPath(path: holonomicPath): void {}

	protected toString(objects: any[], keys: string[]): string {
		return JSON.stringify(objects);
	}

	protected getFileData(path: TankPath): string {
		return `
RIGHT = ${this.toString(path.rightSetpoints, [])}
LEFT = ${this.toString(path.leftSetpoints, [])}
COORDS = ${this.toString(path.coords, [])}
`;
	}
}
