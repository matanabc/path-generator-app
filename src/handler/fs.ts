const { writeFileSync, readFileSync } = window.fs;

export const saveFile = async (path: string, data: any) => writeFileSync(path, JSON.stringify(data));
export const loadFile = async (path: string) => JSON.parse(readFileSync(path));
