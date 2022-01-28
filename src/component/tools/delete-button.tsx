import { MdDelete } from 'react-icons/md';
import { useState } from 'react';

import { DELETE_SHORTCUT } from '../../common/shortcut';
import { ConfirmPopup } from '../common/popups';
import { useGenerateStore } from '../../store';
import Button from '../common/button';

export default function DeleteButton() {
	const [show, setShow] = useState(false);
	const deletePath = useGenerateStore((state) => state.deletePath);

	const onClick = () => setShow(true);
	const onCancel = () => setShow(false);
	const onConfirm = () => {
		deletePath();
		setShow(false);
	};

	return (
		<>
			<ConfirmPopup
				show={show}
				title='Delete Path'
				onCancel={onCancel}
				onConfirm={onConfirm}
				message='Are you sure you want to delete path?'
			/>
			<Button title='Delete' variant='danger' shortcut={DELETE_SHORTCUT} onClick={onClick}>
				<MdDelete />
			</Button>
		</>
	);
}
