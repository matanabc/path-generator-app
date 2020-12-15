import { isWeb } from '../redux/view/actions';
import FileHandler from './file-handler';

var handler = undefined;
var dispatch = undefined;

export async function init(callback) {
	try {
		dispatch = callback;
		handler = new FileHandler(dispatch);
		dispatch(isWeb(false));
	} catch (error) {
		dispatch(isWeb(true));
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

export async function deleteJsonPath(pathName) {
	try {
		handler.deleteJsonPath(pathName);
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
