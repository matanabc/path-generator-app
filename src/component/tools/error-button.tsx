import { MdError } from 'react-icons/md';
import { useState } from 'react';

import { EXPORT_SHORTCUT } from '../../common/shortcut';
import { ConfirmPopup } from '../common/popups';
import { TErrorButtonProps } from './types';
import Button from '../common/button';

export default function ErrorButton({ path }: TErrorButtonProps) {
	const [show, setShow] = useState(false);

	const onClick = () => setShow(true);
	const onCancel = () => setShow(false);

	const message = (
		<>
			{path.error && path.error.message && `${path.error.message}, `}
			{path.error && `${path.error.solution}!\n`}
			{path.error && path.error.position && `${path.error.position}`}
		</>
	);

	return (
		<>
			<ConfirmPopup show={show} title='Error' onCancel={onCancel} onConfirm={onCancel} message={message} />
			<Button title='Error' variant='danger' shortcut={EXPORT_SHORTCUT} onClick={onClick}>
				<MdError />
			</Button>
		</>
	);
}
