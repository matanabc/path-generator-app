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

export const PROJECT_FILE_NAME = 'PathGenerator.json';
export const DEFAULT_PROJECT_FOLDER_PATH = `${window.os.homedir()}/PathGenerator`;
export const DEFAULT_EXPORT_FOLDER_PATH = `${DEFAULT_PROJECT_FOLDER_PATH}/export`;
