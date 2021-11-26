import mousetrap, { ExtendedKeyboardEvent } from 'mousetrap';
import { Button as BootstrapButton } from 'react-bootstrap';
import { useEffect } from 'react';
import 'mousetrap-global-bind';

import { TButtonProps } from './types';

export default function Button(props: TButtonProps) {
	const onClick = (e: ExtendedKeyboardEvent, combo: string) => {
		e.preventDefault();
		props.onClick(e, combo);
	};

	useEffect(() => {
		if (!props.shortcut) return;
		mousetrap.unbind(props.shortcut);
		mousetrap.bind(props.shortcut, onClick);
	});

	return <BootstrapButton {...props} />;
}
