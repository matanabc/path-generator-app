import { useFilesStore, useGenerateStore } from '../../store';
import TankPath from 'path-generator/lib/path/tank-path';
import { ExportOption } from '../../common/enums';
import PythonExport from './python';
import JSONExport from './json';
import JavaExport from './java';
import CSVExport from './csv';

const exports = {
	[ExportOption.CSV]: new CSVExport(),
	[ExportOption.JSON]: new JSONExport(),
	[ExportOption.Java]: new JavaExport(),
	[ExportOption.Python]: new PythonExport(),
};

export const exportPath = (path: TankPath) => {
	const { exportType, exportFolder } = useFilesStore.getState();
	const { selected } = useGenerateStore.getState();
	exports[exportType].export(path, selected, exportFolder);
};
