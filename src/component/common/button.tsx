import { Button as BootstrapButton } from 'react-bootstrap';
import { useEffect } from 'react';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

import { TButtonProps } from './types';

export default function Button(props: TButtonProps) {
	useEffect(() => {
		if (!props.shortcut) return;
		mousetrap.unbind(props.shortcut);
		mousetrap.bind(props.shortcut, props.onClick);
	});

	return <BootstrapButton {...props} />;
}
