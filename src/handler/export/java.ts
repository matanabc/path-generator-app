import Export from './export';

export default class JavaExport extends Export {
	protected savePath(): void {
		this.saveToFile(this.getFileData(), `${this.pathName.toLowerCase()}.java`);
	}

	protected toString(objects: any[], keys: string[]) {
		const info = keys.join(', ');
		const lines = objects.map((object) => this.toJavaLine(object, keys));
		return `{
${this.tab}${this.tab}// ${info}
${lines.join(this.endLine)}
${this.tab}};`;
	}

	protected getFileData(): string {
		return `
package ;

public class ${this.pathName} {
	public static final double[][] right = ${this.toString(this.path.rightSetpoints, this.setpointKeys)}
	public static final double[][] left = ${this.toString(this.path.leftSetpoints, this.setpointKeys)}
	public static final double[][] coords = ${this.toString(this.path.coords, this.coordKeys)}
}`;
	}

	protected toJavaLine(object: any, keys: string[]): string {
		const data = keys.map((key) => object[key]);
		return `${this.tab}${this.tab}{ ${data.join(', ')} },`;
	}
}
