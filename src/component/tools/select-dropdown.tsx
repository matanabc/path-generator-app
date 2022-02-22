import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';

import { CREATE_SHORTCUT } from '../../common/shortcut';
import { usePath, useSelected } from '../../store/use';
import { PromptPopup } from '../common/popups';

type TPathClick = (selected: string) => void;

const getPathItems = (paths: string[], selected: string, onClick: TPathClick) =>
	paths.map((path, index) => (
		<Dropdown.Item key={index} active={path === selected} onClick={() => onClick(path)}>
			{path}
		</Dropdown.Item>
	));

export default function SelectDropdown() {
	const { paths, addPath } = usePath();
	const { selected, setSelectedPath } = useSelected();
	const [showPopup, setShowPopup] = useState(false);

	const title = selected === '' ? 'Select Path' : selected;

	const onClick = () => setShowPopup(true);
	const onCancel = () => setShowPopup(false);
	const onConfirm = (value: string) => {
		if (value === '' || paths.includes(value)) return;
		setShowPopup(false);
		addPath(value);
	};

	useEffect(() => {
		mousetrap.bind(CREATE_SHORTCUT, onClick);
	}, []);

	return (
		<>
			<PromptPopup
				show={showPopup}
				onCancel={onCancel}
				onConfirm={onConfirm}
				placeholder={'path name'}
				title={'Create new path'}
			/>

			<DropdownButton title={title} drop='up'>
				{getPathItems(Object.keys(paths), selected, setSelectedPath)}
				<Dropdown.Divider />
				<Dropdown.Item onClick={onClick}>New Path</Dropdown.Item>
			</DropdownButton>
		</>
	);
}
