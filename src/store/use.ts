import shallow from 'zustand/shallow';
import { useFieldStore, useFilesStore, useGenerateStore, useRobotStore } from '.';

export const useDrawConfig = () =>
	useRobotStore(({ drawConfig, setDrawConfig }) => ({ drawConfig, setDrawConfig }), shallow);
export const useDriveType = () =>
	useRobotStore(({ driveType, setDriveType }) => ({ driveType, setDriveType }), shallow);
export const usePathConfig = () =>
	useRobotStore(({ pathConfig, setPathConfig }) => ({ pathConfig, setPathConfig }), shallow);
export const useRobotPosition = () =>
	useRobotStore(({ robotPosition, setRobotPosition }) => ({ robotPosition, setRobotPosition }), shallow);

export const useProjectFolder = () =>
	useFilesStore(({ projectFolder, setProjectFolder }) => ({ projectFolder, setProjectFolder }), shallow);
export const useFileExportFolder = () =>
	useFilesStore(({ exportFolder, setExportFolder }) => ({ exportFolder, setExportFolder }), shallow);
export const useFileExportType = () =>
	useFilesStore(({ exportType, setExportType }) => ({ exportType, setExportType }), shallow);

export const useFieldImage = () => useFieldStore((state) => state.image);
export const useUpdateFieldStore = () => useFieldStore((state) => state.updateFieldStore);
export const useFieldTopLeft = () => useFieldStore(({ topLeftX, topLeftY }) => ({ topLeftX, topLeftY }), shallow);
export const useFieldInPixel = () =>
	useFieldStore(({ heightInPixel, widthInPixel }) => ({ heightInPixel, widthInPixel }), shallow);
export const useFieldInMeter = () =>
	useFieldStore(({ heightInMeter, widthInMeter }) => ({ heightInMeter, widthInMeter }), shallow);

export const useSelected = () =>
	useGenerateStore(({ selected, setSelectedPath }) => ({ selected, setSelectedPath }), shallow);
export const useWaypoint = () =>
	useGenerateStore(
		({ addWaypoint, removeWaypoint, setWaypoint }) => ({ addWaypoint, removeWaypoint, setWaypoint }),
		shallow
	);
export const usePath = () =>
	useGenerateStore(
		({ paths, addPath, deletePath, renamePath }) => ({ paths, addPath, deletePath, renamePath }),
		shallow
	);
