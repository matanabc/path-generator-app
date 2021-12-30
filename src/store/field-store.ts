import { persist } from 'zustand/middleware';
import create from 'zustand';

import { StoreStorageName } from '../common/enums';
import { ipc } from '../handler';

export default create(
	persist(
		(set) => ({
			image: '',
			...{ topLeftX: 0, topLeftY: 0 },
			...{ widthInMeter: 0, heightInMeter: 0 },
			...{ widthInPixel: 100, heightInPixel: 100 },
			updateFieldStore: (value: any) => set({ ...value }),
		}),
		{ name: StoreStorageName.Field, getStorage: () => ipc.stateStorage }
	)
);
