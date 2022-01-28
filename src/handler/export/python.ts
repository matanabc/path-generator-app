import Export from './export';

export default class PythonExport extends Export {
	protected savePath(): void {
		this.saveToFile(this.getFileData(), `${this.pathName}.py`);
	}

	protected toString(objects: any[], keys: string[]): string {
		return JSON.stringify(objects);
	}

	protected getFileData(): string {
		return `
RIGHT = ${this.toString(this.path.rightSetpoints, [])}
LEFT = ${this.toString(this.path.leftSetpoints, [])}
COORDS = ${this.toString(this.path.coords, [])}
`;
	}
}
