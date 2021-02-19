import { deleteGroup, renameGroup, addGroup } from '../../redux/group/actions';
import { deletePath, renamePath, addPath } from '../../redux/path/actions';

export function deleteAction(isPathMode) {
	if (isPathMode) return deletePath();
	return deleteGroup();
}

export function renameAction(isPathMode, name) {
	if (isPathMode) return renamePath(name);
	return renameGroup(name);
}

export function createNewAction(isPathMode, name) {
	if (isPathMode) return addPath(name);
	return addGroup(name);
}
