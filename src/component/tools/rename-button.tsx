import { MdEdit } from 'react-icons/md';
import { useState } from 'react';

import { RENAME_SHORTCUT } from '../../common/shortcut';
import { usePath, useSelected } from '../../store/use';
import { PromptPopup } from '../common/popups';
import Button from '../common/button';

export default function RenameButton() {
	const [show, setShow] = useState(false);
	const { selected } = useSelected();
	const { renamePath } = usePath();

	const onClick = () => setShow(true);
	const onCancel = () => setShow(false);
	const onConfirm = (value: string) => {
		renamePath(value);
		setShow(false);
	};

	return (
		<>
			<PromptPopup
				show={show}
				title='Rename Path'
				onCancel={onCancel}
				onConfirm={onConfirm}
				defaultValue={selected}
			/>
			<Button title='Rename' onClick={onClick} shortcut={RENAME_SHORTCUT}>
				<MdEdit />
			</Button>
		</>
	);
}