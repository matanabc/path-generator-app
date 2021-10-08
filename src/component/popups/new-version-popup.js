import React, { useState } from 'react';

import AlertPopup from './alert-popup';

export default function NewVersionPopup({ newVersion }) {
	const [showPopup, setShowPopup] = useState(true);
	const onClick = (event) => {
		setShowPopup(false);
		if (event) event.preventDefault();
		if (document.activeElement) document.activeElement.blur();
	};

	return (
		<AlertPopup
			title={`v${newVersion} is available`}
			show={showPopup && newVersion !== undefined}
			onClose={onClick}
			body={
				<div>
					{'There is a new version waiting for you to update to!\n' +
						'To update jest go to settings and click on update...'}
				</div>
			}
		/>
	);
}
