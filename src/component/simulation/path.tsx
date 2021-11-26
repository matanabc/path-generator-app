import { Rnd, RndResizeCallback } from 'react-rnd';
import { useEffect, useRef } from 'react';

import { useFieldStore } from '../../store';
import { TPathProps } from './types';
import { materToPixel } from '../../util';

const styleToNumber = (value: string) => Number(value.replace('px', ''));

export default function Path({ coords }: TPathProps) {
	const { topLeftX, topLeftY, widthInPixel, heightInPixel, updateFieldStore } = useFieldStore();
	const size = { width: widthInPixel, height: heightInPixel };
	const position = { x: topLeftX, y: topLeftY };
	const onResize: RndResizeCallback = async (e, dir, { style }, delta, { x, y }) =>
		updateFieldStore({
			...{ heightInPixel: styleToNumber(style.height), widthInPixel: styleToNumber(style.width) },
			...{ topLeftX: x, topLeftY: y },
		});

	const canvasRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas === null) return;
		const ctx = canvas.getContext('2d');
		if (ctx === null) return;
		ctx.lineWidth = 5;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		coords.forEach((setpoint, index) => {
			const { x, y } = materToPixel(setpoint.x, setpoint.y);
			if (index === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		});
		ctx.strokeStyle = 'Yellow';
		ctx.stroke();
	}, [coords]);

	return (
		<Rnd position={position} size={size} bounds='#Field' disableDragging onResize={onResize}>
			<canvas ref={canvasRef} id='Path' width={size.width} height={size.height} />
		</Rnd>
	);
}
