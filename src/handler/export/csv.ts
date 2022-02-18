import holonomicPath from 'path-generator/lib/path/holonomic-path';
import tankPath from 'path-generator/lib/path/tank-path';

import Export from './export';

export default class CSVExport extends Export {
	protected saveTankPath(path: tankPath): void {
		this.exportFolder = `${this.exportFolder}/${this.pathName}`;
		this.createFolder(this.exportFolder);
		this.saveToFile(this.toString(path.rightSetpoints, this.setpointKeys), 'right.csv');
		this.saveToFile(this.toString(path.leftSetpoints, this.setpointKeys), 'left.csv');
		this.saveToFile(this.toString(path.coords, this.coordKeys), 'coords.csv');
	}

	protected saveHolonomicPath(path: holonomicPath): void {}

	protected toString(objects: any[], keys: string[]) {
		const info = keys.join(', ');
		const lines = objects.map((object) => this.toCSVLine(object, keys));
		return [info, ...lines].join(this.endLine);
	}

	protected toCSVLine(object: any, keys: string[]): string {
		return keys.map((key) => object[key]).join(',');
	}
}
