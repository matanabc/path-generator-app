import { useFieldStore, useFilesStore, usePathConfigStore } from '../store';
import { PROJECT_FILE_NAME, ExportOption, StoreOption } from '../consts';
import { initialPathConfigState } from '../store/path-config-store';
import { Holonomic, PathConfig, Tank } from 'path-generator';
import { initialFieldState } from '../store/field-store';
import { initialFileState } from '../store/files-store';
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
	const { projectFolder, exportFolder } = await loadFromStore(Folders, initialFileState);
	const { widthInPixel, heightInPixel, topLeftX, topLeftY } = await loadFromStore(Filed, initialFieldState);

	const projectFile: TProjectFile = await loadFile(`${projectFolder}/${PROJECT_FILE_NAME}`);
	const { pathConfig = new PathConfig(), exportType } = { ...initialPathConfigState, ...projectFile };
	const driveType = projectFile.driveType === 'Holonomic' ? Holonomic : Tank;
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
