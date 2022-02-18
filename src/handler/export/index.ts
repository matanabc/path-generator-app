import { Path } from 'path-generator';

import { useFilesStore, useGenerateStore } from '../../store';
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

export const exportPath = (path: Path) => {
	const { exportType, exportFolder } = useFilesStore.getState();
	const { selected } = useGenerateStore.getState();
	exports[exportType].export(path, selected, exportFolder);
};
