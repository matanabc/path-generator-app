import { StoreOption, DEFAULT_EXPORT_FOLDER_PATH, DEFAULT_PROJECT_FOLDER_PATH, PROJECT_FILE_NAME } from '../consts';
import { loadFromStore, saveInStore } from './ipc';
import { loadFile, saveFile } from './fs';
import { useFilesStore } from '../store';
import { TProjectFile } from './types';

export async function loadProject() {
	const { projectFolder = DEFAULT_PROJECT_FOLDER_PATH, exportFolder = DEFAULT_EXPORT_FOLDER_PATH } =
		await loadFromStore(StoreOption.Folders, {});
	const projectFile: TProjectFile = await loadFile(`${projectFolder}/${PROJECT_FILE_NAME}`);
	useFilesStore.setState({ projectFolder, exportFolder, exportType: projectFile.exportType });
}

export async function saveProject() {
	const { projectFolder, exportFolder, exportType } = useFilesStore.getState();
	await saveInStore(StoreOption.Folders, { projectFolder, exportFolder });
	const projectFile: TProjectFile = { exportType };
	await saveFile(`${projectFolder}/${PROJECT_FILE_NAME}`, projectFile);
}
