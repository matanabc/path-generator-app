import FileHandler from './file-handler';

var handler = undefined;

export function init(isWeb) {
	try {
		handler = new FileHandler();
		isWeb(false);
	} catch (error) {
		isWeb(true);
	}
}
