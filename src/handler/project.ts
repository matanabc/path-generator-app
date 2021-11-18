import { DEFAULT_EXPORT_FOLDER_PATH, DEFAULT_PROJECT_FOLDER_PATH, PROJECT_FILE_NAME } from '../consts';
import { Holonomic, PathConfig, Tank } from 'path-generator';
import { ExportOption, StoreOption } from '../consts';
import { loadFromStore, saveInStore } from './ipc';
import { loadFile, saveFile } from './fs';
import { useFilesStore, usePathConfigStore } from '../store';

type TProjectFile = { exportType: ExportOption; driveType: 'Tank' | 'Holonomic'; pathConfig: PathConfig };

export async function loadProject() {
	const { projectFolder = DEFAULT_PROJECT_FOLDER_PATH, exportFolder = DEFAULT_EXPORT_FOLDER_PATH } =
		await loadFromStore(StoreOption.Folders, {});
	const projectFile: TProjectFile = await loadFile(`${projectFolder}/${PROJECT_FILE_NAME}`);
	const { pathConfig = new PathConfig(), exportType } = projectFile;
	const driveType = projectFile.driveType === 'Holonomic' ? Holonomic : Tank;
	useFilesStore.setState({ projectFolder, exportFolder, exportType });
	usePathConfigStore.setState({ driveType, pathConfig });
}

export async function saveProject() {
	const { pathConfig } = usePathConfigStore.getState();
	const driveType = usePathConfigStore.getState().driveType === Holonomic ? 'Holonomic' : 'Tank';
	const { projectFolder, exportFolder, exportType } = useFilesStore.getState();
	await saveInStore(StoreOption.Folders, { projectFolder, exportFolder });
	const projectFile: TProjectFile = { exportType, driveType, pathConfig };
	await saveFile(`${projectFolder}/${PROJECT_FILE_NAME}`, projectFile);
}
