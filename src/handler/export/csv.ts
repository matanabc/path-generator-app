import Export from './export';

export default class CSVExport extends Export {
	protected savePath(): void {
		this.exportFolder = `${this.exportFolder}/${this.pathName}`;
		this.createFolder(this.exportFolder);
		this.saveToFile(this.toString(this.path.rightSetpoints, this.setpointKeys), 'right.csv');
		this.saveToFile(this.toString(this.path.leftSetpoints, this.setpointKeys), 'left.csv');
		this.saveToFile(this.toString(this.path.coords, this.coordKeys), 'coords.csv');
	}

	protected toString(objects: any[], keys: string[]) {
		const info = keys.join(', ');
		const lines = objects.map((object) => this.toCSVLine(object, keys));
		return [info, ...lines].join(this.endLine);
	}

	protected toCSVLine(object: any, keys: string[]): string {
		return keys.map((key) => object[key]).join(',');
	}
}
