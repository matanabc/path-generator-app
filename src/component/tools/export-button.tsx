import TankPath from 'path-generator/lib/path/tank-path';
import { exportPath } from '../../handler/export';
import { FiDownload } from 'react-icons/fi';

import { EXPORT_SHORTCUT } from '../../common/shortcut';
import Button from '../common/button';

type TProps = { path: TankPath };

export default function ExportButton({ path }: TProps) {
	const onClick = async () => exportPath(path);

	return (
		<Button title='Rename' shortcut={EXPORT_SHORTCUT} onClick={onClick}>
			<FiDownload />
		</Button>
	);
}
