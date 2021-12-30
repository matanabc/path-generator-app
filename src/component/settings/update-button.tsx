import { Button } from '../common';

export default function UpdateButton() {
	if (false)
		return (
			<Button className={'col'} variant={'success'} onClick={() => {}}>
				{`Update to vX.X.X`}
			</Button>
		);
	return <span />;
}
