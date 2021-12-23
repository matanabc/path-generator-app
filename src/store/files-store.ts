import create from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_EXPORT_FOLDER_PATH, DEFAULT_PROJECT_FOLDER_PATH } from '../consts';
import { ExportOption, StoreStorageName } from '../consts';
import { ipc } from '../handler';

export default create(
	persist(
		(set) => ({
			exportType: ExportOption.CSV,
			exportFolder: DEFAULT_EXPORT_FOLDER_PATH,
			projectFolder: DEFAULT_PROJECT_FOLDER_PATH,
			setExportType: (exportType: ExportOption) => set({ exportType }),
			setExportFolder: (exportFolder: string) => set({ exportFolder }),
			setProjectFolder: (projectFolder: string) => set({ projectFolder }),
		}),
		{ name: StoreStorageName.Files, getStorage: () => ipc.stateStorage }
	)
);
