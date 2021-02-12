import { initialState } from './initial-state';
import reduceReducers from 'reduce-reducers';
import group from './group/reducer';
import project from './project/reducer';
import { createStore } from 'redux';
import view from './view/reducer';
import path from './path/reducer';
import app from './app/reducer';

const reducers = reduceReducers(initialState, view, path, project, app, group);
const store = createStore(reducers);

if (process.env.NODE_ENV === 'development')
	store.subscribe(() => {
		console.log('Store change!', store.getState());
	});

export default store;
