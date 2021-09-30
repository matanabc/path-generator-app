const { NODE_ENV } = process.env;

export const RENAME_SHORTCUT = NODE_ENV === 'development' ? [] : ['command+r', 'alt+r'];
export const DIRECTION_SHORTCUT = ['command+f', 'alt+f'];
export const DOWNLOAD_SHORTCUT = ['command+s', 'alt+s'];
export const SETTINGS_SHORTCUT = ['command+p', 'alt+p'];
export const DELETE_SHORTCUT = ['command+d', 'alt+d'];
export const CREATE_SHORTCUT = ['command+n', 'alt+n'];
export const MODE_SHORTCUT = ['command+m', 'alt+m'];
export const CONFIRM_SHORTCUT = ['return', 'enter'];
export const PLAY_SHORTCUT = ['space'];
export const CANCEL_SHORTCUT = ['esc'];
