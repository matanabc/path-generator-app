export enum ExportOption {
	CSV = 'CSV',
	JSON = 'JSON',
	Java = 'Java',
	Python = 'Python',
}

export enum StoreOption {
	Folders = 'folders',
	Filed = 'Filed',
}

export enum DriveTypeOption {
	Tank = 'Tank',
	Holonomic = 'Holonomic',
}

export enum StoreStorageName {
	Generate = 'generate-store',
	Robot = 'robot-store',
	Field = 'field-store',
	Files = 'files-store',
}

export const BORDER_SIZE = 5;
export const WAYPOINT_SIZE = 30;
export const OFFSET_SIZE = WAYPOINT_SIZE / 2 - BORDER_SIZE / 2;

export const PROJECT_FILE_NAME = 'PathGenerator.json';
export const DEFAULT_PROJECT_FOLDER_PATH = `${window.os.homedir()}/PathGenerator`;
export const DEFAULT_EXPORT_FOLDER_PATH = `${DEFAULT_PROJECT_FOLDER_PATH}/export`;
