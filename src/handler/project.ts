import { DEFAULT_EXPORT_FOLDER_PATH, DEFAULT_PROJECT_FOLDER_PATH, PROJECT_FILE_NAME } from '../consts';
import { useFieldStore, useFilesStore, usePathConfigStore } from '../store';
import { Holonomic, PathConfig, Tank } from 'path-generator';
import { initialFieldState } from '../store/field-store';
import { ExportOption, StoreOption } from '../consts';
import { loadFromStore, saveInStore } from './ipc';
import { loadFile, saveFile } from './fs';

type TProjectFile = {
	pathConfig: PathConfig;
	exportType: ExportOption;
	driveType: 'Tank' | 'Holonomic';
	filed: { widthInMeter: number; heightInMeter: number; image: string };
};

export async function loadProject() {
	const { Folders, Filed } = StoreOption;
	const { widthInPixel, heightInPixel, topLeftX, topLeftY } = await loadFromStore(Filed, initialFieldState);
	const { projectFolder = DEFAULT_PROJECT_FOLDER_PATH, exportFolder = DEFAULT_EXPORT_FOLDER_PATH } =
		await loadFromStore(Folders, {});

	const projectFile: TProjectFile = await loadFile(`${projectFolder}/${PROJECT_FILE_NAME}`);
	const driveType = projectFile.driveType === 'Holonomic' ? Holonomic : Tank;
	const { pathConfig = new PathConfig(), exportType } = projectFile;
	const { widthInMeter, heightInMeter, image } = projectFile.filed;

	usePathConfigStore.setState({ driveType, pathConfig });
	useFilesStore.setState({ projectFolder, exportFolder, exportType });
	useFieldStore.setState({ widthInMeter, heightInMeter, image, widthInPixel, heightInPixel, topLeftX, topLeftY });
}

export async function saveProject() {
	const { pathConfig } = usePathConfigStore.getState();
	const { widthInMeter, heightInMeter, image } = useFieldStore.getState();
	const { projectFolder, exportFolder, exportType } = useFilesStore.getState();

	const driveType = usePathConfigStore.getState().driveType === Holonomic ? 'Holonomic' : 'Tank';
	const filed = { widthInMeter, heightInMeter, image };
	const projectFile: TProjectFile = { exportType, driveType, pathConfig, filed };

	await saveInStore(StoreOption.Folders, { projectFolder, exportFolder });
	await saveFile(`${projectFolder}/${PROJECT_FILE_NAME}`, projectFile);
}
