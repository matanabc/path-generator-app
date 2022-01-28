import Coord from 'path-generator/lib/motionProfiling/coord';
import Export from './export';

export default class JSONExport extends Export {
	protected savePath(): void {
		const object = {
			right: this.path.rightSetpoints,
			left: this.path.leftSetpoints,
			coords: this.path.coords.map(this.copyCoord),
		};
		this.saveToFile(JSON.stringify(object), `${this.pathName}.json`);
	}

	protected toString(objects: any[], keys: string[]): string {
		return JSON.stringify(objects);
	}

	protected copyCoord({ x, y, angle }: Coord) {
		return Object.assign({}, { x, y, angle });
	}
}
