import { Holonomic, PathConfig, Tank } from 'path-generator';
import { combine } from 'zustand/middleware';
import create from 'zustand';

type TDriveType = typeof Tank | typeof Holonomic;
type TPathConfigState = { driveType: TDriveType; pathConfig: PathConfig };

export const initialPathConfigState: TPathConfigState = { driveType: Tank, pathConfig: new PathConfig() };

export default create(
	combine(initialPathConfigState, (set) => ({
		setDriveType: (driveType: TDriveType) => set({ driveType }),
		setPathConfig: (value: any) => set(({ pathConfig }) => ({ pathConfig: { ...pathConfig, ...value } })),
	}))
);
