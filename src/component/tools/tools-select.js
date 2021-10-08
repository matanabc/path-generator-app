import { Dropdown, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

import { changeSelectedGroup } from '../../redux/group/actions';
import { changeSelectedPath } from '../../redux/path/actions';
import { CREATE_SHORTCUT } from '../../shortcut';

class ToolsSelect extends React.Component {
	componentDidMount = () => mousetrap.bindGlobal(CREATE_SHORTCUT, this.props.showCreateNewPopup);

	getItems = () => {
		const { pathsName, groups, isPathMode, selected } = this.props;
		const list = isPathMode ? pathsName : groups;
		return list.map((element, index) => {
			return (
				<Dropdown.Item
					as="button"
					key={index}
					active={element === selected}
					onClick={() => this.setSelected(element)}
				>
					{element}
				</Dropdown.Item>
			);
		});
	};

	setSelected = async (selected) => {
		const { changeSelectedGroup, changeSelectedPath, isPathMode } = this.props;
		if (document.activeElement) document.activeElement.blur();
		if (isPathMode) await changeSelectedPath(selected, this.props);
		else changeSelectedGroup(selected, this.props);
	};

	render() {
		const { showCreateNewPopup, isPathMode, selected } = this.props;
		const selectDropdownText = selected ? selected : isPathMode ? 'Select Path' : 'Select Group';
		return (
			<DropdownButton className="ml-3 mr-2" size="lg" drop="up" title={selectDropdownText}>
				{this.getItems()}
				<Dropdown.Divider />
				<Dropdown.Item as="button" onClick={showCreateNewPopup}>
					{isPathMode ? 'New Path' : 'New Group'}
				</Dropdown.Item>
			</DropdownButton>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathsName: Object.keys(state.paths),
		groups: Object.keys(state.groups),
		isPathMode: state.isPathMode,
		pathConfig: state.pathConfig,
		driveType: state.driveType,
		selected: state.selected,
		paths: state.paths,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeSelectedGroup: (groupName) => dispatch(changeSelectedGroup(groupName)),
		changeSelectedPath: async (pathName, state) => dispatch(await changeSelectedPath(pathName, state)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsSelect);
