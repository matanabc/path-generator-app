import { exportPath } from '../../handler/export';
import { FiDownload } from 'react-icons/fi';

import { EXPORT_SHORTCUT } from '../../common/shortcut';
import { TExportButtonProps } from './types';
import Button from '../common/button';

export default function ExportButton({ path }: TExportButtonProps) {
	const onClick = async () => exportPath(path);

	return (
		<Button title='Save' shortcut={EXPORT_SHORTCUT} onClick={onClick}>
			<FiDownload />
		</Button>
	);
}
