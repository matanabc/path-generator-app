import { MdError, FiDownload } from 'react-icons/all';
import React, { useState } from 'react';

import { DOWNLOAD_SHORTCUT } from '../../shortcut';
import AlertPopup from '../popups/alert-popup';
import ToolsButton from './tools-button';

export default function ExportButton({ disabled, isWeb, saveCSVTo, pathName, path, onExport }) {
	const isPathIllegal = path && path.isIllegal();
	const [showIllegalPopup, setShowIllegalPopup] = useState(false);
	const [showExportPopup, setShowExportPopup] = useState(false);
	const onIllegalClose = async () => setShowIllegalPopup(false);
	const onExportClose = async () => setShowExportPopup(false);
	const onExportClick = async (event) => {
		if (event) event.preventDefault();
		if (document.activeElement) document.activeElement.blur();
		onExport(setShowExportPopup, setShowIllegalPopup);
	};

	return (
		<>
			<AlertPopup
				show={showExportPopup && !isWeb}
				onClose={onExportClose}
				title="Export path"
				body={
					saveCSVTo !== ''
						? `Path ${pathName} exported successfully!`
						: "Can't Export path, you need to set export folder path in settings!"
				}
			/>

			<AlertPopup
				title={path && path.isIllegal() && path.error.message}
				show={showIllegalPopup}
				onClose={onIllegalClose}
				body={
					<div>
						{path && path.isIllegal() && path.error.position && `${path.error.position}\n\n`}
						{path && path.isIllegal() && path.error.problem && `${path.error.problem}\n\n`}
						{path && path.isIllegal() && `${path.error.solution}!`}
					</div>
				}
			/>

			<ToolsButton
				title="Export path"
				disabled={disabled}
				onClick={onExportClick}
				shortcut={DOWNLOAD_SHORTCUT}
				variant={isPathIllegal ? 'danger' : 'primary'}
				body={isPathIllegal ? <MdError /> : <FiDownload />}
			/>
		</>
	);
}
