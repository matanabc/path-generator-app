import { persist, combine } from 'zustand/middleware';
import create from 'zustand';

import { StoreStorageName } from '../consts';
import { fs } from '../handler';

type TPaths = { [key: string]: any };

export default create(
	persist(
		combine(
			{
				paths: {} as TPaths,
				selected: '',
			},
			(set, get) => ({
				setSelectedPath: (selected: string) => set({ selected }),
				setWaypoint: (index: number, value: any) => {
					const { paths, selected } = get();
					Object.assign(paths[selected][index], value);
					set({ paths });
				},
				addWaypoint: (index: number, waypoint?: Object) => {
					const { paths, selected } = get();
					if (waypoint === undefined) waypoint = paths[selected][index];
					paths[selected].splice(index, 0, { ...waypoint });
					set({ paths });
				},
				removeWaypoint: (index: number) => {
					const { paths, selected } = get();
					if (paths[selected].length > 2) paths[selected].splice(index, 1);
					set({ paths });
				},
			})
		),
		{ name: StoreStorageName.Generate, getStorage: () => fs.stateStorage }
	)
);
