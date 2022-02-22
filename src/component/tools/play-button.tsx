import { MdPlayArrow, MdPause, MdReplay } from 'react-icons/md';
import { useEffect, useState } from 'react';

import { PLAY_SHORTCUT } from '../../common/shortcut';
import { useRobotPosition } from '../../store/use';
import { useRobotStore } from '../../store';
import { TPlayButtonProps } from './types';
import Button from '../common/button';

const changeRobotPosition = () => {
	const { robotPosition, setRobotPosition } = useRobotStore.getState();
	if (robotPosition < 0) setRobotPosition(1);
	else setRobotPosition(robotPosition + 1);
};

export default function PlayButton({ length }: TPlayButtonProps) {
	const [intervalID, setIntervalID] = useState<NodeJS.Timer | undefined>(undefined);
	const { robotPosition, setRobotPosition } = useRobotPosition();

	const stopInterval = () => {
		if (!intervalID) return;
		clearInterval(intervalID);
		setIntervalID(undefined);
	};

	useEffect(() => {
		if (robotPosition + 1 >= length || (robotPosition < 0 && intervalID)) stopInterval();
	}, [robotPosition]);

	const onClick = () => {
		if (intervalID) stopInterval();
		else {
			if (robotPosition + 1 === length) setRobotPosition(0);
			const interval = setInterval(changeRobotPosition, 0.02 * 1000);
			setIntervalID(interval);
		}
	};

	return (
		<Button title='Play' shortcut={PLAY_SHORTCUT} onClick={onClick}>
			{robotPosition + 1 === length ? <MdReplay /> : intervalID ? <MdPause /> : <MdPlayArrow />}
		</Button>
	);
}
