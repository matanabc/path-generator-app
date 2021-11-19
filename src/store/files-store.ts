import create from 'zustand';
import { combine } from 'zustand/middleware';

import { DEFAULT_EXPORT_FOLDER_PATH, DEFAULT_PROJECT_FOLDER_PATH, ExportOption } from '../consts';

export const initialFileState = {
	exportType: ExportOption.Java,
	projectFolder: DEFAULT_PROJECT_FOLDER_PATH,
	exportFolder: DEFAULT_EXPORT_FOLDER_PATH,
};

export default create(
	combine(initialFileState, (set) => ({
		setProjectFolder: (projectFolder: string) => set({ projectFolder }),
		setExportFolder: (exportFolder: string) => set({ exportFolder }),
		setExportType: (exportType: ExportOption) => set({ exportType }),
	}))
);
