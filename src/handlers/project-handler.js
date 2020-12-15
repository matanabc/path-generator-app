import FileHandler from './file-handler';

var handler = undefined;

export function init() {
	try {
		handler = new FileHandler();
	} catch (error) {}
}
