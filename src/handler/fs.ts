const { writeFileSync, readFileSync, existsSync, mkdirSync } = window.fs;

export const saveJSON = async (path: string, data: any) => await writeFile(path, JSON.stringify(data));
export const loadJSON = async (path: string) => JSON.parse(await readFile(path));

export const writeFile = async (path: string, data: string) => writeFileSync(path, data);
export const readFile = async (path: string) => readFileSync(path);

export const createFolder = (path: string) => {
	if (!existsSync(path)) mkdirSync(path, { recursive: true });
};
