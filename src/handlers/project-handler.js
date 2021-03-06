import LocalStorageHandler from './local-storage-handler';
import FileHandler from './file-handler';

var handler = undefined;

export async function projectInit(callback) {
	try {
		handler = new FileHandler(callback);
	} catch (error) {
		handler = new LocalStorageHandler(callback);
	}
}

export async function changeProjectFolderPath(folderPath) {
	try {
		handler.changeProjectFolderPath(folderPath);
	} catch (error) {}
}

export async function saveJsonPath(pathName, path) {
	try {
		handler.saveJsonPath(pathName, path);
	} catch (error) {}
}

export async function deletePath(pathName, csvFolder) {
	try {
		handler.deletePath(pathName, csvFolder);
	} catch (error) {}
}

export async function renameJsonPath(oldName, newName) {
	try {
		handler.renameJsonPath(oldName, newName);
	} catch (error) {}
}

export async function saveJsonProject(settings) {
	try {
		handler.saveJsonProject(settings);
	} catch (error) {}
}

export async function loadFieldImage(image) {
	try {
		handler.loadFieldImage(image);
	} catch (error) {}
}

export async function saveCSVPath(path, pathName, folder) {
	try {
		handler.saveCSVPath(path, pathName, folder);
	} catch (error) {}
}
