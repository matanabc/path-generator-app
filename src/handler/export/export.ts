import HolonomicPath from 'path-generator/lib/path/holonomic-path';
import TankPath from 'path-generator/lib/path/tank-path';
import { Path } from 'path-generator';

import { DriveTypeOption } from '../../common/enums';
import { useRobotStore } from '../../store';
import { fs } from '..';

export default abstract class Export {
	protected endLine = '\n';
	protected tab = '\t';

	protected setpointKeys = ['position', 'velocity', 'acceleration'];
	protected coordKeys = ['x', 'y', 'angle'];

	protected exportFolder = {} as string;
	protected pathName = {} as string;

	protected abstract toString(objects: any[], keys: string[]): string;
	protected abstract saveHolonomicPath(path: HolonomicPath): void;
	protected abstract saveTankPath(path: TankPath): void;

	protected savePath(path: Path): void {
		if (useRobotStore.getState().driveType === DriveTypeOption.Tank) this.saveTankPath(path as TankPath);
		else this.saveHolonomicPath(path as HolonomicPath);
	}

	protected saveToFile(data: string, fileName: string): void {
		fs.writeFile(`${this.exportFolder}/${fileName}`, data);
	}

	protected createFolder(path: string): void {
		fs.createFolder(path);
	}

	public export(path: Path, pathName: string, exportFolder: string): void {
		this.pathName = pathName;
		this.exportFolder = exportFolder;
		this.savePath(path);
	}
}
