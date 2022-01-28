import { Button } from '../common';

export default function UpdateButton() {
	return (
		<Button className={'col'} variant={'success'} onClick={() => {}}>
			{`Update to vX.X.X`}
		</Button>
	);
}
