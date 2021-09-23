import { deleteGroup, renameGroup, addGroup } from '../../redux/group/actions';
import { deletePath, renamePath, addPath } from '../../redux/path/actions';

export function deleteAction(state) {
	if (state.isPathMode) return deletePath(state);
	return deleteGroup();
}

export function renameAction(isPathMode, paths, oldName, newName) {
	if (isPathMode) return renamePath(paths, oldName, newName);
	return renameGroup(newName);
}

export function createNewAction(isPathMode, paths, pathConfig, driveType, name) {
	if (isPathMode) return addPath(paths, pathConfig, driveType, name);
	return addGroup(name);
}
