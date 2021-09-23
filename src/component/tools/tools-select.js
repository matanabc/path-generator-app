import { changeSelectedGroup } from '../../redux/group/actions';
import { changePopupsStatus } from '../../redux/view/actions';
import { changeSelectedPath } from '../../redux/path/actions';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { CREATE_SHORTCUT } from '../../shortcut';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsSelect extends React.Component {
	constructor(props) {
		super(props);
		this.getItems = this.getItems.bind(this);
		this.setSelected = this.setSelected.bind(this);
	}

	componentDidMount() {
		mousetrap.bindGlobal(CREATE_SHORTCUT, this.props.showCreateNewPopup);
	}

	getItems() {
		const { pathsName, groups, globalState } = this.props;
		const { isPathMode, selected } = globalState;
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
	}

	async setSelected(selected) {
		const { changeSelectedGroup, changeSelectedPath, globalState } = this.props;
		const { isPathMode } = globalState;
		if (document.activeElement) document.activeElement.blur();
		if (isPathMode) await changeSelectedPath(selected, globalState);
		else changeSelectedGroup(selected, globalState);
	}

	render() {
		const { showCreateNewPopup, globalState } = this.props;
		const { isPathMode, selected } = globalState;
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
		globalState: state,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showCreateNewPopup: () => dispatch(changePopupsStatus('createNewPopup')),
		changeSelectedGroup: (groupName) => dispatch(changeSelectedGroup(groupName)),
		changeSelectedPath: async (pathName, state) => dispatch(await changeSelectedPath(pathName, state)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsSelect);
