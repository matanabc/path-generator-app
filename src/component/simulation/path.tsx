import { Rnd, RndResizeCallback } from 'react-rnd';

import { useFieldStore } from '../../store';
import { TPathProps } from './types';

const styleToNumber = (value: string) => Number(value.replace('px', ''));

export default function Path({}: TPathProps) {
	const { topLeftX, topLeftY, widthInPixel, heightInPixel, updateFieldStore } = useFieldStore();
	const size = { width: widthInPixel, height: heightInPixel };
	const position = { x: topLeftX, y: topLeftY };
	const onResize: RndResizeCallback = async (e, dir, { style }, delta, { x, y }) =>
		updateFieldStore({
			...{ heightInPixel: styleToNumber(style.height), widthInPixel: styleToNumber(style.width) },
			...{ topLeftX: x, topLeftY: y },
		});

	return (
		<Rnd position={position} size={size} bounds='#Field' disableDragging onResize={onResize}>
			<canvas id='Path' width={size.width} height={size.height} />
		</Rnd>
	);
}
