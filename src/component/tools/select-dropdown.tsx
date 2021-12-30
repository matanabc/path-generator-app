import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useGenerateStore } from '../../store';

type TPathClick = (selected: string) => void;

const getPathItems = (paths: object, selected: string, onClick: TPathClick) =>
	Object.keys(paths).map((path, index) => (
		<Dropdown.Item key={index} active={path === selected} onClick={() => onClick(path)}>
			{path}
		</Dropdown.Item>
	));

export default function SelectDropdown() {
	const paths = useGenerateStore((state) => state.paths);
	const selected = useGenerateStore((state) => state.selected);
	const setSelectedPath = useGenerateStore((state) => state.setSelectedPath);

	const title = selected === '' ? 'Select Path' : selected;

	return (
		<>
			<DropdownButton title={title} drop='up'>
				{getPathItems(paths, selected, setSelectedPath)}
				<Dropdown.Divider />
				<Dropdown.Item>New Path</Dropdown.Item>
			</DropdownButton>
		</>
	);
}
