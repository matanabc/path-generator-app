import { Modal } from 'react-bootstrap';

import { TSettingsProps } from './types';
import { saveProject } from '../../handler/project';
import RobotDrawConfig from './robot-draw-config';
import ProjectConfig from './project-config';
import ExportTypeConfig from './export-type';
import UpdateButton from './update-button';
import FiledConfig from './filed-config';
import PathConfig from './path-config';
import './settings.css';

export default function Settings({ show, onClose }: TSettingsProps) {
	const onHide = async () => {
		onClose();
		await saveProject();
	};

	return (
		<Modal centered scrollable show={show} onHide={onHide} size={'xl'}>
			<Modal.Header closeButton>
				<Modal.Title>Settings</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ProjectConfig />
				<PathConfig />
				<FiledConfig />
				<RobotDrawConfig />
				<ExportTypeConfig />
			</Modal.Body>
			<Modal.Footer>
				<UpdateButton />
			</Modal.Footer>
		</Modal>
	);
}
