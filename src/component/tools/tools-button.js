import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

export default function toolsButton({ title, variant, disabled, body, onClick, shortcut }) {
	useEffect(() => (shortcut ? mousetrap.bindGlobal(shortcut, onClick) : undefined), []);
	return (
		<Button size="lg" className="mr-2" variant={variant} title={title} onClick={onClick} disabled={disabled}>
			{body}
		</Button>
	);
}
