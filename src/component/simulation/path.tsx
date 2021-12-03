import { Rnd, RndResizeCallback } from 'react-rnd';
import { useEffect, useRef } from 'react';

import { useFieldStore } from '../../store';
import { drawCoords } from '../../draw';
import { TPathProps } from './types';

const styleToNumber = (value: string) => Number(value.replace('px', ''));

export default function Path({ coords }: TPathProps) {
	const { topLeftX, topLeftY, widthInPixel, heightInPixel, updateFieldStore } = useFieldStore();
	const size = { width: widthInPixel, height: heightInPixel };
	const position = { x: topLeftX, y: topLeftY };
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const onResize: RndResizeCallback = async (e, dir, { style }, delta, { x, y }) =>
		updateFieldStore({
			...{ heightInPixel: styleToNumber(style.height), widthInPixel: styleToNumber(style.width) },
			...{ topLeftX: x, topLeftY: y },
		});

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas === null) return;
		const ctx = canvas.getContext('2d');
		if (ctx === null) return;
		drawCoords(canvas, ctx, coords);
	});

	return (
		<Rnd position={position} size={size} bounds='#Field' disableDragging onResize={onResize}>
			<canvas ref={canvasRef} id='Path' width={size.width} height={size.height} />
		</Rnd>
	);
}
