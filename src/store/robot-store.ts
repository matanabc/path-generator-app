import { persist, combine } from 'zustand/middleware';
import { PathConfig } from 'path-generator';
import create from 'zustand';

import { StoreStorageName } from '../common/enums';
import { ipc } from '../handler';

export default create(
	persist(
		combine(
			{
				robotPosition: 0,
				driveType: 'Tank',
				pathConfig: new PathConfig(),
				drawConfig: { width: 0, length: 0, center: 0 },
			},
			(set, get) => ({
				setDriveType: (driveType: string) => set({ driveType }),
				setRobotPosition: (robotPosition: number) => set({ robotPosition }),
				setPathConfig: (value: any) => set(({ pathConfig }) => ({ pathConfig: { ...pathConfig, ...value } })),
				setDrawConfig: (value: any) => set(({ drawConfig }) => ({ drawConfig: { ...drawConfig, ...value } })),
			})
		),
		{
			getStorage: () => ipc.stateStorage,
			partialize: (state) => {
				state.robotPosition = 0;
				return state;
			},
			name: StoreStorageName.Robot,
		}
	)
);
