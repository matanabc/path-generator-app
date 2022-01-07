import { Rnd, RndResizeCallback } from 'react-rnd';
import { useEffect, useRef, useState } from 'react';

import { useFieldStore, useRobotStore } from '../../store';
import { drawCoords } from '../../common/draw';
import { TPathProps } from './types';

const styleToNumber = (value: string) => Number(value.replace('px', ''));

export default function Path({ coords }: TPathProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { topLeftX, topLeftY, widthInPixel, heightInPixel, updateFieldStore } = useFieldStore();
	const size = { width: widthInPixel, height: heightInPixel };
	const position = { x: topLeftX, y: topLeftY };

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

	const { robotPosition, setRobotPosition } = useRobotStore();
	const [rangePosition, setRangePosition] = useState(0);

	const updateRobotPosition = (index: number) => {
		const coord = coords[index];
		if (!coord) return;
		setRobotPosition(coord);
		setRangePosition(index);
	};

	const onWheel = (e: React.WheelEvent) => updateRobotPosition(Number((rangePosition + e.deltaY * 0.25).toFixed(0)));

	useEffect(() => {
		if (!robotPosition) setRangePosition(0);
	}, [robotPosition]);

	return (
		<Rnd position={position} size={size} bounds='#Field' disableDragging onResize={onResize}>
			<canvas ref={canvasRef} id='Path' width={size.width} height={size.height} onWheel={onWheel} />
		</Rnd>
	);
}
