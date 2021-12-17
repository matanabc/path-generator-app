import { persist, combine } from 'zustand/middleware';
import create from 'zustand';

import { ipc } from '../handler';

type TPaths = { [key: string]: any };

export default create(
	persist(
		combine(
			{
				paths: {} as TPaths,
				selected: '',
			},
			(set, get) => ({
				setWaypoint: (index: number, value: any) => {
					const { paths, selected } = get();
					Object.assign(paths[selected][index], value);
					set({ paths });
				},
				addWaypoint: (index: number) => {
					const { paths, selected } = get();
					const waypoint = paths[selected][index];
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
		{ name: 'path-store', getStorage: () => ipc.sessionStorage }
	)
);
