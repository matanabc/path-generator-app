import { persist, combine } from 'zustand/middleware';
import { Holonomic } from 'path-generator';
import create from 'zustand';

import { PATHS_FILE_NAME } from '../common/consts';
import { StoreStorageName } from '../common/enums';
import { fs, ipc } from '../handler';
import { useRobotStore } from '.';

type TPaths = { [key: string]: any };

const getProjectFolder = async () => {
	const { state = {} } = JSON.parse(await ipc.loadFromStore(StoreStorageName.Files, '{}'));
	return state.projectFolder || '';
};

const stateStorage = {
	removeItem: (name: string) => {},
	getItem: async (name: string) => {
		const paths = await fs.loadJSON(`${await getProjectFolder()}/${PATHS_FILE_NAME}`);
		return JSON.stringify({ state: { paths } });
	},
	setItem: async (name: string, value: string) => {
		await fs.saveJSON(`${await getProjectFolder()}/${PATHS_FILE_NAME}`, JSON.parse(value).state.paths);
	},
};

export default create(
	persist(
		combine(
			{
				paths: {} as TPaths,
				selected: '',
			},
			(set, get) => ({
				setSelectedPath: (selected: string) => {
					useRobotStore.getState().setRobotPosition(0);
					set({ selected });
				},
				addPath: (pathName: string) => {
					let { paths, selected } = get();
					selected = pathName;
					paths[pathName] = [
						new Holonomic.Waypoint(1, 1, 0, 0, 0, 1),
						new Holonomic.Waypoint(2, 1, 0, 0, 0, 1),
					];
					useRobotStore.getState().setRobotPosition(0);
					set({ paths, selected });
				},
				renamePath: (newName: string) => {
					let { paths, selected } = get();
					paths[newName] = paths[selected];
					delete paths[selected];
					selected = newName;
					set({ paths, selected });
				},
				deletePath: () => {
					let { paths, selected } = get();
					delete paths[selected];
					selected = '';
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
					useRobotStore.getState().setRobotPosition(0);
					set({ paths });
				},
			})
		),
		{
			getStorage: () => stateStorage,
			name: StoreStorageName.Generate,
			partialize: ({ paths }) => ({ paths }),
		}
	)
);
