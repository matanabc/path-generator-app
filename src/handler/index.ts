declare global {
	interface Window {
		ipcRenderer: any;
		fs: any;
		os: any;
	}
}

export * as Project from './project';
