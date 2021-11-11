import { TFiledProps } from './types';

export default function Field({ filedImageUrl }: TFiledProps) {
	const style = { backgroundImage: `url('${filedImageUrl}')` };

	return <canvas id='Field' style={style} />;
}
