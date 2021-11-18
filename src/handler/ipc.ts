const { invoke } = window.ipcRenderer;

export const saveInStore = async (key: string, value: any) => await invoke('saveInStore', key, value);
export const loadFromStore = async (key: string, defaultValue: any) => await invoke('loadFromStore', key, defaultValue);
