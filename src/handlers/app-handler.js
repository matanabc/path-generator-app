var dispatch = undefined;
var ipcRenderer = undefined;

export async function appUpdaterInit(callback) {
	try {
		dispatch = callback;
		ipcRenderer = window.require('electron').ipcRenderer;
		getAppVersion();
		onUpdateDownloaded();
	} catch (error) {}
}

async function getAppVersion() {
	try {
		const appVersion = await ipcRenderer.invoke('GetAppVersion');
	} catch (error) {}
}

function onUpdateDownloaded() {
	try {
		ipcRenderer.on('update-downloaded', (event, info) => {
			// callback(info.version);
		});
	} catch (error) {}
}

export function updateApp() {
	try {
		ipcRenderer.invoke('UpdateApp');
	} catch (error) {}
}
