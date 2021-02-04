import { initialState } from './initial-state';
import pathsGroup from './pathsGroup/reducer';
import reduceReducers from 'reduce-reducers';
import project from './project/reducer';
import { createStore } from 'redux';
import view from './view/reducer';
import path from './path/reducer';
import app from './app/reducer';

const reducers = reduceReducers(initialState, view, path, project, app, pathsGroup);
const store = createStore(reducers);

if (process.env.NODE_ENV === 'development')
	store.subscribe(() => {
		console.log('Store change!', store.getState());
	});

export default store;
