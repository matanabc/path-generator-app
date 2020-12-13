import { createStore, combineReducers } from 'redux';
import field from './field-reducer';

const reducers = combineReducers({ field });
const store = createStore(reducers);

store.subscribe(() => {
	console.log('Store change!', store.getState());
});

store.dispatch({
	type: '',
});

export default store;
