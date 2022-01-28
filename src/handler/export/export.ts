import TankPath from 'path-generator/lib/path/tank-path';
import { fs } from '..';

export default abstract class Export {
	protected endLine = '\n';
	protected tab = '\t';

	protected setpointKeys = ['position', 'velocity', 'acceleration'];
	protected coordKeys = ['x', 'y', 'angle'];

	protected exportFolder = {} as string;
	protected pathName = {} as string;
	protected path = {} as TankPath;

	protected abstract toString(objects: any[], keys: string[]): string;
	protected abstract savePath(): void;

	protected saveToFile(data: string, fileName: string): void {
		fs.writeFile(`${this.exportFolder}/${fileName}`, data);
	}

	protected createFolder(path: string): void {
		fs.createFolder(path);
	}

	public export(path: TankPath, pathName: string, exportFolder: string): void {
		this.path = path;
		this.pathName = pathName;
		this.exportFolder = exportFolder;
		this.savePath();
	}
}
