import holonomicPath from 'path-generator/lib/path/holonomic-path';
import Coord from 'path-generator/lib/motionProfiling/coord';
import tankPath from 'path-generator/lib/path/tank-path';

import Export from './export';

export default class JSONExport extends Export {
	protected saveTankPath(path: tankPath): void {
		const object = {
			right: path.rightSetpoints,
			left: path.leftSetpoints,
			coords: path.coords.map(this.copyCoord),
		};
		this.saveToFile(JSON.stringify(object), `${this.pathName}.json`);
	}

	protected saveHolonomicPath(path: holonomicPath): void {}

	protected toString(objects: any[], keys: string[]): string {
		return JSON.stringify(objects);
	}

	protected copyCoord({ x, y, angle }: Coord) {
		return Object.assign({}, { x, y, angle });
	}
}
