import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import './project-loader.css';

export default function ProjectLoader({}) {
	const [show, setShow] = useState(true);

	useEffect(() => {
		Promise.all([])
			.then(() => setShow(false))
			.catch(() => setShow(false));
	}, []);

	if (show)
		return (
			<>
				<div className='Background' />
				<Spinner id='Spinner' animation='border' />
			</>
		);
	else return <div />;
}
