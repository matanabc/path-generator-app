import { Rnd, RndResizeCallback } from 'react-rnd';
import { useEffect, useState } from 'react';

import { useFieldStore, useFilesStore } from '../../store';
import { fs } from '../../handler';

const styleToNumber = (value: string) => Number(value.replace('px', ''));
const getImageUrl = async (image: string, projectFolder: string) => {
	if (image === '') return image;
	if (image.startsWith('http')) return image;
	if (image.indexOf('/') === -1) image = `${projectFolder}/${image}`;
	const data = await fs.readFile(image);
	return URL.createObjectURL(new Blob([data]));
};

export default function Field() {
	const [imageUrl, setImageUrl] = useState('');
	const style = { backgroundImage: `url('${imageUrl}')` };
	const image = useFieldStore((state) => state.image);
	const projectFolder = useFilesStore((state) => state.projectFolder);

	useEffect(() => {
		getImageUrl(image, projectFolder)
			.then(setImageUrl)
			.catch(() => setImageUrl(''));
	}, [image, projectFolder]);

	const { topLeftX, topLeftY, widthInPixel, heightInPixel, updateFieldStore } = useFieldStore();
	const size = { width: widthInPixel, height: heightInPixel };
	const position = { x: topLeftX, y: topLeftY };

	const onResize: RndResizeCallback = async (e, dir, { style }, delta, { x, y }) =>
		updateFieldStore({
			...{ heightInPixel: styleToNumber(style.height), widthInPixel: styleToNumber(style.width) },
			...{ topLeftX: x, topLeftY: y },
		});

	return (
		<>
			<canvas id='Field' style={style} />;
			<Rnd position={position} size={size} bounds='#Field' disableDragging onResize={onResize}>
				<canvas id='Path' width={size.width} height={size.height} />
			</Rnd>
		</>
	);
}
