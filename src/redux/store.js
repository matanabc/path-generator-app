import { initialState } from './initial-state';
import reduceReducers from 'reduce-reducers';
import { createStore } from 'redux';
import view from './view/reducer';
import path from './path/reducer';

const reducers = reduceReducers(initialState, view, path);
const store = createStore(reducers);

store.subscribe(() => {
	console.log('Store change!', store.getState());
});

export default store;
