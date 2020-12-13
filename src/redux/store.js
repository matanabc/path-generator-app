import { createStore, combineReducers } from 'redux';
import view from './view/reducer';
import path from './path/reducer';

const reducers = combineReducers({ view, path });
const store = createStore(reducers);

store.subscribe(() => {
	console.log('Store change!', store.getState());
});

store.dispatch({
	type: '',
});

export default store;
