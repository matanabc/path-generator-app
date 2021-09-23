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

export async function deleteJsonPath(pathName, csvFolder) {
	try {
		handler.deletePath(pathName, csvFolder);
	} catch (error) {}
}

export async function deleteGroup(pathName) {
	try {
		handler.deleteGroup(pathName);
	} catch (error) {}
}

export async function renameJsonPath(oldName, newName) {
	try {
		handler.renameJson(oldName, newName, 'paths');
	} catch (error) {}
}

export async function renameJsonGroup(oldName, newName) {
	try {
		handler.renameJson(oldName, newName, 'groups');
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

export async function saveJsonGroup(groupName, paths) {
	try {
		handler.saveJsonGroup(groupName, paths);
	} catch (error) {}
}
