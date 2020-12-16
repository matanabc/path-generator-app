import { isWeb } from '../redux/app/actions';

var dispatch = undefined;
var ipcRenderer = undefined;

export async function appUpdaterInit(callback) {
	try {
		dispatch = callback;
		ipcRenderer = window.require('electron').ipcRenderer;
		dispatch(isWeb(false));
		getAppVersion();
		onUpdateDownloaded();
	} catch (error) {
		dispatch(isWeb(true));
	}
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
