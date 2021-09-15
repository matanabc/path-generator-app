import { PopupsConfig } from '../../component/popups/popups-config';
import {
	CHANGE_LISTEN_TO_MOUSE_STATUS,
	SET_DRAW_ROBOT_INTERVAL,
	CHANGE_RANGE_POSITION,
	CHANGE_POPUPS_STATUS,
	CHANGE_MODE,
} from './action-types';

function changeRangePosition(state, payload) {
	return { ...state, rangePosition: Number(payload.position) };
}

function setDrawRobotInterval(state, payload) {
	if (!state.drawRobotInterval && payload.interval)
		return { ...state, drawRobotInterval: payload.interval, selectedWaypoint: undefined };
	clearInterval(state.drawRobotInterval);
	return { ...state, drawRobotInterval: undefined, selectedWaypoint: undefined };
}

function changePopupsStatus(state, payload) {
	const newState = { ...state, popupsStatus: new PopupsConfig() };
	if (payload.popup !== undefined) newState.popupsStatus[payload.popup] = !state.popupsStatus[payload.popup];
	return newState;
}

function changeListenToMouseStatus(state, payload) {
	const index = state.addWaypointInIndex !== undefined ? undefined : payload.index;
	const status = payload.index !== undefined ? true : !state.listenToMouseClicks;
	return {
		...state,
		listenToMouseClicks: status,
		addWaypointInIndex: index,
	};
}

function changeMode(state, payload) {
	return {
		...state,
		isPathMode: !state.isPathMode,
		listenToMouseClicks: false,
		selected: undefined,
		path: undefined,
	};
}

export default function view(state, action) {
	if (action.type !== SET_DRAW_ROBOT_INTERVAL && action.type !== CHANGE_RANGE_POSITION) {
		state = setDrawRobotInterval(state, {});
		state = changeRangePosition(state, { position: 0 });
	}
	if (action.type === CHANGE_MODE) return changeMode(state, action.payload);
	if (action.type === CHANGE_POPUPS_STATUS) return changePopupsStatus(state, action.payload);
	if (action.type === CHANGE_RANGE_POSITION) return changeRangePosition(state, action.payload);
	if (action.type === SET_DRAW_ROBOT_INTERVAL) return setDrawRobotInterval(state, action.payload);
	if (action.type === CHANGE_LISTEN_TO_MOUSE_STATUS) return changeListenToMouseStatus(state, action.payload);
	return state;
}
