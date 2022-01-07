import { persist, combine } from 'zustand/middleware';
import { PathConfig } from 'path-generator';
import create from 'zustand';

import { TPosition } from '../component/simulation/types';
import { StoreStorageName } from '../common/enums';
import { ipc } from '../handler';

export default create(
	persist(
		combine(
			{
				driveType: 'Tank',
				pathConfig: new PathConfig(),
				robotPosition: {} as undefined | TPosition,
				drawConfig: { width: 0, length: 0, center: 0 },
			},
			(set, get) => ({
				setDriveType: (driveType: string) => set({ driveType }),
				setRobotPosition: (robotPosition: TPosition | undefined) => set({ robotPosition }),
				setPathConfig: (value: any) => set(({ pathConfig }) => ({ pathConfig: { ...pathConfig, ...value } })),
				setDrawConfig: (value: any) => set(({ drawConfig }) => ({ drawConfig: { ...drawConfig, ...value } })),
			})
		),
		{
			getStorage: () => ipc.stateStorage,
			partialize: (state) => {
				delete state.robotPosition;
				return state;
			},
			name: StoreStorageName.Robot,
		}
	)
);
