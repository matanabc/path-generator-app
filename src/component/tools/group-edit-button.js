import React, { useState } from 'react';
import { BsFileEarmarkPlus } from 'react-icons/all';

import ToolsButton from './tools-button';
import GroupInfo from '../group-info';

export default function GroupEditButton({ disabled }) {
	const [showGroupInfo, setShowGroupInfo] = useState(false);
	const onClick = (event) => {
		setShowGroupInfo(!showGroupInfo);
		if (event) event.preventDefault();
		if (document.activeElement) document.activeElement.blur();
	};

	return (
		<>
			<GroupInfo show={showGroupInfo} onClose={onClick} />
			<ToolsButton disabled={disabled} body={<BsFileEarmarkPlus />} onClick={onClick} />
		</>
	);
}
