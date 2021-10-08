import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

export default function ToolsButton({ title, variant, disabled, body, onClick, shortcut }) {
	useEffect(() => {
		if (!shortcut) return;
		mousetrap.unbind(shortcut);
		mousetrap.bindGlobal(shortcut, onClick);
	});

	return (
		<Button size="lg" className="mr-2" variant={variant} title={title} onClick={onClick} disabled={disabled}>
			{body}
		</Button>
	);
}
