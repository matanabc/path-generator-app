import { saveJsonProject } from '../../handlers/project-handler';
import {
	SET_PROJECT_PATH,
	SET_FIELD_CONFIG,
	SET_SETTINGS,
	SET_CSV_PATH,
	SET_IMAGE,
} from './action-types';

function setSettings(state, payload) {
	saveJsonProject(payload.settings);
	return { ...state, ...payload.settings, selectedPath: undefined };
}

function setProjectPath(state, payload) {
	return { ...state, projectPath: payload.projectPath, selectedPath: undefined, paths: {} };
}

function setFieldConfig(state, payload) {
	return { ...state, fieldConfig: payload.fieldConfig };
}

function setImage(state, payload) {
	return { ...state, image: payload.image, imageUrl: payload.imageUrl };
}

function setCSVPath(state, payload) {
	return { ...state, saveCSVTo: payload.path };
}

export default function project(state, action) {
	if (action.type === SET_IMAGE) return setImage(state, action.payload);
	if (action.type === SET_CSV_PATH) return setCSVPath(state, action.payload);
	if (action.type === SET_SETTINGS) return setSettings(state, action.payload);
	if (action.type === SET_PROJECT_PATH) return setProjectPath(state, action.payload);
	if (action.type === SET_FIELD_CONFIG) return setFieldConfig(state, action.payload);
	return state;
}
