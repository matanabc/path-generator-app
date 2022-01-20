import { Rnd, RndResizeCallback } from 'react-rnd';
import { useEffect, useState, memo } from 'react';

import { TFiledProps } from './types';
import { fs } from '../../handler';

const styleToNumber = (value: string) => Number(value.replace('px', ''));
const getImageUrl = async (image: string, projectFolder: string) => {
	if (image === '') return image;
	if (image.startsWith('http')) return image;
	if (image.indexOf('/') === -1) image = `${projectFolder}/${image}`;
	const data = await fs.readFile(image);
	return URL.createObjectURL(new Blob([data]));
};

export default memo(function Field({
	image,
	topLeftX,
	topLeftY,
	widthInPixel,
	heightInPixel,
	projectFolder,
	updateFieldStore,
}: TFiledProps) {
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
});
