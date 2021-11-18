import create from 'zustand';
import { combine } from 'zustand/middleware';

import { ExportOption } from '../consts';

export default create(
	combine({ projectFolder: '', exportFolder: '', exportType: ExportOption.Java }, (set) => ({
		setProjectFolder: (projectFolder: string) => set({ projectFolder }),
		setExportFolder: (exportFolder: string) => set({ exportFolder }),
		setExportType: (exportType: ExportOption) => set({ exportType }),
	}))
);
