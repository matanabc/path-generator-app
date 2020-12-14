import { PopupsConfig } from '../../component/popups/popups-config';
import {
	CHANGE_RANGE_POSITION,
	SET_DRAW_ROBOT_INTERVAL,
	CHANGE_POPUPS_STATUS,
} from './action-types';

function changeRangePosition(state, payload) {
	return { ...state, rangePosition: Number(payload.position) };
}

function setDrawRobotInterval(state, payload) {
	if (!state.drawRobotInterval && payload.interval)
		return { ...state, drawRobotInterval: payload.interval };
	clearInterval(state.drawRobotInterval);
	return { ...state, drawRobotInterval: undefined };
}

function changePopupsStatus(state, payload) {
	const newState = { ...state, popupsStatus: new PopupsConfig() };
	if (payload.popup !== undefined)
		newState.popupsStatus[payload.popup] = !state.popupsStatus[payload.popup];
	return newState;
}

export default function view(state, action) {
	if (action.type !== SET_DRAW_ROBOT_INTERVAL && action.type !== CHANGE_RANGE_POSITION) {
		state = setDrawRobotInterval(state, {});
		state = changeRangePosition(state, { position: 0 });
	}
	if (action.type === CHANGE_POPUPS_STATUS) return changePopupsStatus(state, action.payload);
	if (action.type === CHANGE_RANGE_POSITION) return changeRangePosition(state, action.payload);
	if (action.type === SET_DRAW_ROBOT_INTERVAL) return setDrawRobotInterval(state, action.payload);
	return state;
}
