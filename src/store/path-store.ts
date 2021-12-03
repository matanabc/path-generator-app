import { persist, combine } from 'zustand/middleware';
import { PathConfig } from 'path-generator';
import create from 'zustand';

import { ipc } from '../handler';

type TPaths = { [key: string]: any };

export default create(
	persist(
		combine(
			{
				pathConfig: new PathConfig(),
				paths: {} as TPaths,
				driveType: 'Tank',
				selected: '',
			},
			(set, get) => ({
				setDriveType: (driveType: string) => set({ driveType }),
				setPathConfig: (value: any) => set(({ pathConfig }) => ({ pathConfig: { ...pathConfig, ...value } })),
				setWaypoint: (index: number, value: any) => {
					const { paths, selected } = get();
					Object.assign(paths[selected][index], value);
					set({ paths });
				},
			})
		),
		{ name: 'path-store', getStorage: () => ipc.sessionStorage }
	)
);
