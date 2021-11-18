import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import { loadProject } from '../../handler/project';
import './project-loader.css';

export default function ProjectLoader({}) {
	const [show, setShow] = useState(true);

	useEffect(() => {
		Promise.all([loadProject()])
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
