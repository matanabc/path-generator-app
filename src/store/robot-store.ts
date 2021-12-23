import { persist, combine } from 'zustand/middleware';
import { PathConfig } from 'path-generator';
import create from 'zustand';

import { StoreStorageName } from '../consts';
import { ipc } from '../handler';

export default create(
	persist(
		combine(
			{
				driveType: 'Tank',
				pathConfig: new PathConfig(),
				drawConfig: { width: 0, length: 0, center: 0 },
			},
			(set, get) => ({
				setDriveType: (driveType: string) => set({ driveType }),
				setPathConfig: (value: any) => set(({ pathConfig }) => ({ pathConfig: { ...pathConfig, ...value } })),
				setDrawConfig: (value: any) => set(({ drawConfig }) => ({ drawConfig: { ...drawConfig, ...value } })),
			})
		),
		{ name: StoreStorageName.Robot, getStorage: () => ipc.stateStorage }
	)
);
