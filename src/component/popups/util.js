import { deleteGroup } from '../../redux/group/actions';
import { deletePath } from '../../redux/path/actions';

export function deleteAction(isPathMode) {
	if (isPathMode) return deletePath();
	return deleteGroup();
}
