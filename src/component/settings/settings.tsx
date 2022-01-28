import { Modal } from 'react-bootstrap';

import RobotDrawConfig from './robot-draw-config';
import ProjectConfig from './project-config';
import ExportTypeConfig from './export-type';
import UpdateButton from './update-button';
import { TSettingsProps } from './types';
import FiledConfig from './filed-config';
import PathConfig from './path-config';
import './settings.css';

export default function Settings({ show, onClose }: TSettingsProps) {
	return (
		<Modal centered scrollable show={show} onHide={onClose} size={'xl'}>
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
			{false && (
				<Modal.Footer>
					<UpdateButton />
				</Modal.Footer>
			)}
		</Modal>
	);
}
