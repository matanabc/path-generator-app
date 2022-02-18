import holonomicPath from 'path-generator/lib/path/holonomic-path';
import TankPath from 'path-generator/lib/path/tank-path';

import Export from './export';

export default class JavaExport extends Export {
	protected saveTankPath(path: TankPath): void {
		this.saveToFile(this.getFileData(path), `${this.pathName.toLowerCase()}.java`);
	}

	protected saveHolonomicPath(path: holonomicPath): void {}

	protected toString(objects: any[], keys: string[]) {
		const info = keys.join(', ');
		const lines = objects.map((object) => this.toJavaLine(object, keys));
		return `{
${this.tab}${this.tab}// ${info}
${lines.join(this.endLine)}
${this.tab}};`;
	}

	protected getFileData(path: TankPath): string {
		return `
package ;

public class ${this.pathName} {
	public static final double[][] right = ${this.toString(path.rightSetpoints, this.setpointKeys)}
	public static final double[][] left = ${this.toString(path.leftSetpoints, this.setpointKeys)}
	public static final double[][] coords = ${this.toString(path.coords, this.coordKeys)}
}`;
	}

	protected toJavaLine(object: any, keys: string[]): string {
		const data = keys.map((key) => object[key]);
		return `${this.tab}${this.tab}{ ${data.join(', ')} },`;
	}
}
