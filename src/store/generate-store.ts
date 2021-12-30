import { persist, combine } from 'zustand/middleware';
import { Holonomic } from 'path-generator';
import create from 'zustand';

import { StoreStorageName } from '../common/enums';
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
				addPath: (pathName: string) => {
					let { paths, selected } = get();
					selected = pathName;
					paths[pathName] = [
						new Holonomic.Waypoint(1, 1, 0, 0, 0, 1),
						new Holonomic.Waypoint(2, 1, 0, 0, 0, 1),
					];
					set({ paths, selected });
				},
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
