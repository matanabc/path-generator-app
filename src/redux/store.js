import {createStore} from "redux";
import reducer from './reducer';

const store = createStore(reducer);

store.subscribe(()=> {
    console.log("Store change!", store.getState());
});

export default store;