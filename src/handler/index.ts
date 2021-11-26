declare global {
	interface Window {
		ipcRenderer: any;
		fs: any;
		os: any;
	}
}

export * as fs from './fs';
export * as ipc from './ipc';
