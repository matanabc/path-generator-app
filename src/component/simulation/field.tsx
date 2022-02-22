import { Rnd, RndResizeCallback } from 'react-rnd';
import { useEffect, useState } from 'react';

import { useFieldImage, useFieldInPixel, useFieldTopLeft } from '../../store/use';
import { useProjectFolder, useUpdateFieldStore } from '../../store/use';
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
	const image = useFieldImage();
	const { projectFolder } = useProjectFolder();
	const updateFieldStore = useUpdateFieldStore();
	const { topLeftX, topLeftY } = useFieldTopLeft();
	const { heightInPixel, widthInPixel } = useFieldInPixel();

	const [imageUrl, setImageUrl] = useState('');
	const position = { x: topLeftX, y: topLeftY };
	const style = { backgroundImage: `url('${imageUrl}')` };
	const size = { width: widthInPixel, height: heightInPixel };

	const onResize: RndResizeCallback = async (e, dir, { style }, delta, { x, y }) =>
		updateFieldStore({
			...{ heightInPixel: styleToNumber(style.height), widthInPixel: styleToNumber(style.width) },
			...{ topLeftX: x, topLeftY: y },
		});

	useEffect(() => {
		getImageUrl(image, projectFolder)
			.then(setImageUrl)
			.catch(() => setImageUrl(''));
	}, [image, projectFolder]);

	return (
		<>
			<canvas id='Field' style={style} />
			<Rnd position={position} size={size} bounds='#Field' disableDragging onResize={onResize}>
				<canvas id='Path' width={size.width} height={size.height} />
			</Rnd>
		</>
	);
}
