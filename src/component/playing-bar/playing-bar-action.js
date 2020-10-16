import { PLAYING_BAR_REDUCER } from '../../redux/reducer-types';
import { SET_RANGE_POSITION, ADD_TO_RANGE_POSITION } from './playing-bar-types'

export function setRangePosition(rangePosition) {
    return {
        reducer: PLAYING_BAR_REDUCER,
        type: SET_RANGE_POSITION,
        payload: {
            rangePosition: Number(rangePosition),
        }
    };
}


export function addToRangePosition(add) {
    return {
        reducer: PLAYING_BAR_REDUCER,
        type: ADD_TO_RANGE_POSITION,
        payload: {
            add: Number(add),
        }
    };
}
