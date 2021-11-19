import { Rnd, RndResizeCallback } from 'react-rnd';

import { saveInStore } from '../../handler/ipc';
import { useFieldStore } from '../../store';
import { StoreOption } from '../../consts';
import { TPathProps } from './types';

const styleToNumber = (value: string) => Number(value.replace('px', ''));

export default function Path({}: TPathProps) {
	const { topLeftX, topLeftY, widthInPixel, heightInPixel, updateFiledInPixel } = useFieldStore();
	const size = { width: widthInPixel, height: heightInPixel };
	const position = { x: topLeftX, y: topLeftY };
	const onResize: RndResizeCallback = async (e, dir, { style }, delta, { x, y }) => {
		updateFiledInPixel(styleToNumber(style.height), styleToNumber(style.width), x, y);
		await saveInStore(StoreOption.Filed, { widthInPixel, heightInPixel, topLeftX, topLeftY });
	};

	return (
		<Rnd position={position} size={size} bounds='#Field' disableDragging onResize={onResize}>
			<canvas id='Path' width={size.width} height={size.height} />
		</Rnd>
	);
}
