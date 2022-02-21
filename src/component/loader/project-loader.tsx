import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import { useFieldStore, useFilesStore, useGenerateStore, useRobotStore } from '../../store';
import './project-loader.css';

export default function ProjectLoader() {
	const [show, setShow] = useState(true);

	useEffect(() => {
		Promise.all([
			useFieldStore.persist.rehydrate(),
			useFilesStore.persist.rehydrate(),
			useRobotStore.persist.rehydrate(),
			useGenerateStore.persist.rehydrate(),
		])
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
