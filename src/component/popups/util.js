import { deleteGroup, renameGroup } from '../../redux/group/actions';
import { deletePath, renamePath } from '../../redux/path/actions';

export function deleteAction(isPathMode) {
	if (isPathMode) return deletePath();
	return deleteGroup();
}

export function renameAction(isPathMode, name) {
	if (isPathMode) return renamePath(name);
	return renameGroup(name);
}
