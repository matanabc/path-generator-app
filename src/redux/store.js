import { createStore, applyMiddleware } from 'redux';
import reduceReducers from 'reduce-reducers';
import thunk from 'redux-thunk';

import { initialState } from './initial-state';
import project from './project/reducer';
import group from './group/reducer';
import view from './view/reducer';
import path from './path/reducer';
import app from './app/reducer';

const reducers = reduceReducers(initialState, view, path, project, app, group);
const store = createStore(reducers, applyMiddleware(thunk));

if (process.env.NODE_ENV === 'development')
	store.subscribe(() => {
		console.log('Store change!', store.getState());
	});

export default store;
