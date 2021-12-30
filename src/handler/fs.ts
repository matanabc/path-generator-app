import { DEFAULT_PROJECT_FOLDER_PATH, PROJECT_FILE_NAME } from '../common/consts';
import { StoreStorageName } from '../common/enums';
import { loadFromStore } from './ipc';

const { writeFileSync, readFileSync } = window.fs;

export const saveJSON = async (path: string, data: any) => await writeFile(path, JSON.stringify(data));
export const loadJSON = async (path: string) => JSON.parse(await readFile(path));

export const writeFile = async (path: string, data: string) => writeFileSync(path, data);
export const readFile = async (path: string) => readFileSync(path);

const getProjectFolder = async () => {
	const { state } = JSON.parse(await loadFromStore(StoreStorageName.Files, '{"state":{}}'));
	const { projectFolder = DEFAULT_PROJECT_FOLDER_PATH } = state;
	return projectFolder;
};

export const stateStorage = {
	removeItem: (name: string) => {},
	getItem: async (name: string) =>
		JSON.stringify({ state: await loadJSON(`${await getProjectFolder()}/${PROJECT_FILE_NAME}`) }),
	setItem: async (name: string, value: string) =>
		await saveJSON(`${await getProjectFolder()}/${PROJECT_FILE_NAME}`, JSON.parse(value).state),
};
