import { APP_REDUCER } from '../../redux/reducer-types';
import { LOAD_COOKIE } from './app-action-types';

export function loadCookiesToState(robotConfig, paths) {
    return {
        reducer: APP_REDUCER,
        type: LOAD_COOKIE,
        payload: {
            robotConfig: robotConfig,
            paths: paths,
        },
    };
}
