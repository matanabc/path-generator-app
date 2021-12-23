import { useEffect, useState } from 'react';

import { useFieldStore, useFilesStore } from '../../store';
import { TFiledProps } from './types';
import { fs } from '../../handler';

const getImageUrl = async (image: string, projectFolder: string) => {
	if (image === '') return image;
	if (image.startsWith('http')) return image;
	if (image.indexOf('/') === -1) image = `${projectFolder}/${image}`;
	const data = await fs.readFile(image);
	return URL.createObjectURL(new Blob([data]));
};

export default function Field({}: TFiledProps) {
	const [imageUrl, setImageUrl] = useState('');
	const style = { backgroundImage: `url('${imageUrl}')` };
	const image = useFieldStore((state) => state.image);
	const projectFolder = useFilesStore((state) => state.projectFolder);

	useEffect(() => {
		getImageUrl(image, projectFolder)
			.then(setImageUrl)
			.catch(() => setImageUrl(''));
	}, [image, projectFolder]);

	return <canvas id='Field' style={style} />;
}
