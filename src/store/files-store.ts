import create from 'zustand';
import { persist } from 'zustand/middleware';

import { ExportOption, StoreStorageName } from '../common/enums';
import { ipc } from '../handler';

export default create(
	persist(
		(set) => ({
			exportFolder: '',
			projectFolder: '',
			exportType: ExportOption.CSV,
			setExportType: (exportType: ExportOption) => set({ exportType }),
			setExportFolder: (exportFolder: string) => set({ exportFolder }),
			setProjectFolder: (projectFolder: string) => set({ projectFolder }),
		}),
		{ name: StoreStorageName.Files, getStorage: () => ipc.stateStorage }
	)
);
