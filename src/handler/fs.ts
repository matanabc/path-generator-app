const { writeFileSync, readFileSync } = window.fs;

export const saveJSON = async (path: string, data: any) => writeFileSync(path, JSON.stringify(data));
export const loadJSON = async (path: string) => JSON.parse(readFileSync(path));

export const readFile = async (path: string) => readFileSync(path);
