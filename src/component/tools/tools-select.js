import { changeSelectedPathsGroup } from '../../redux/pathsGroup/actions';
import { changePopupsStatus } from '../../redux/view/actions';
import { changeSelectedPath } from '../../redux/path/actions';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsSelect extends React.Component {
	constructor(props) {
		super(props);
		this.getPathsItem = this.getPathsItem.bind(this);
		this.setSelected = this.setSelected.bind(this);
	}

	componentDidMount() {
		mousetrap.bindGlobal(['command+n', 'alt+n'], this.props.showCreateNewPathPopup);
	}

	getPathsItem() {
		const list = this.props.isPathMode ? this.props.pathsName : this.props.pathsGroups;
		return list.map((element, index) => {
			return (
				<Dropdown.Item as="button" key={index} onClick={() => this.setSelected(element)}>
					{element}
				</Dropdown.Item>
			);
		});
	}

	setSelected(selected) {
		if (document.activeElement) document.activeElement.blur();
		if (this.props.isPathMode) this.props.changeSelectedPath(selected);
		else this.props.changeSelectedPathsGroup(selected);
	}

	render() {
		const selectDropdownText = this.props.selected
			? this.props.selected
			: this.props.isPathMode
			? 'Select Path'
			: 'Select Paths Group';

		return (
			<Dropdown>
				<Dropdown.Toggle size="lg">{selectDropdownText}</Dropdown.Toggle>
				<Dropdown.Menu>
					{this.getPathsItem()}
					<Dropdown.Divider />
					<Dropdown.Item as="button" onClick={this.props.showCreateNewPathPopup}>
						{this.props.isPathMode ? 'New Path' : 'New Paths Group'}
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathsGroups: Object.keys(state.pathsGroups),
		pathsName: Object.keys(state.paths),
		isPathMode: state.isPathMode,
		selected: state.selected,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeSelectedPathsGroup: (pathsGroupName) => dispatch(changeSelectedPathsGroup(pathsGroupName)),
		showCreateNewPathPopup: () => dispatch(changePopupsStatus('createNewPathPopup')),
		changeSelectedPath: (pathName) => dispatch(changeSelectedPath(pathName)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsSelect);
