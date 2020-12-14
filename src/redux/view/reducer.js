import { FieldConfig, RobotDrawConfig } from '../../component/field-view/view-config';
import { CHANGE_RANGE_POSITION, SET_DRAW_ROBOT_INTERVAL } from './action-types';
import { PopupsConfig } from '../../component/popups/popups-config';

const initialState = {
	fieldConfig: new FieldConfig(16.5354, 8.001, 50, 25, 198, 103),
	robotDrawConfig: new RobotDrawConfig(),
	popupsStatus: new PopupsConfig(),
	drawRobotInterval: undefined,
	rangePosition: 0,
	imageUrl:
		'https://www.chiefdelphi.com/uploads/default/optimized/3X/4/4/44492d390e1f186bef450b307b132e820fd88263_2_690x388.png',
};

function changeRangePosition(state, payload) {
	return { ...state, rangePosition: Number(payload.position) };
}

function setDrawRobotInterval(state, payload) {
	if (!state.drawRobotInterval && payload.interval)
		return { ...state, drawRobotInterval: payload.interval };
	clearInterval(state.drawRobotInterval);
	return { ...state, drawRobotInterval: undefined };
}

export default function view(state = initialState, action) {
	if (action.type === CHANGE_RANGE_POSITION) return changeRangePosition(state, action.payload);
	if (action.type === SET_DRAW_ROBOT_INTERVAL) return setDrawRobotInterval(state, action.payload);
	return state;
}
