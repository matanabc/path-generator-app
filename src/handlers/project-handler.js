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
