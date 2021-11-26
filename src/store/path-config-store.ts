import { persist } from 'zustand/middleware';
import { PathConfig } from 'path-generator';
import create from 'zustand';

import { ipc } from '../handler';

export default create(
	persist(
		(set) => ({
			driveType: 'Tank',
			...new PathConfig(),
			setDriveType: (driveType: string) => set({ driveType }),
			setPathConfig: (value: any) => set((state) => ({ ...state, ...value })),
		}),
		{ name: 'path-config-store', getStorage: () => ipc.sessionStorage }
	)
);
