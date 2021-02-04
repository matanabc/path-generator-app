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
		this.setSelectedPath = this.setSelectedPath.bind(this);
	}

	componentDidMount() {
		mousetrap.bindGlobal(['command+n', 'alt+n'], this.props.showCreateNewPathPopup);
	}

	getPathsItem() {
		const list = this.props.isPathMode ? this.props.pathsName : this.props.pathsGroups;
		return list.map((pathName, index) => {
			return (
				<Dropdown.Item as="button" key={index} onClick={() => this.setSelectedPath(pathName)}>
					{pathName}
				</Dropdown.Item>
			);
		});
	}

	setSelectedPath(pathName) {
		if (document.activeElement) document.activeElement.blur();
		this.props.changeSelectedPath(pathName);
	}

	render() {
		const selectDropdownText = this.props.pathName
			? this.props.pathName
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
		pathName: state.selectedPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showCreateNewPathPopup: () => dispatch(changePopupsStatus('createNewPathPopup')),
		changeSelectedPath: (pathName) => dispatch(changeSelectedPath(pathName)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsSelect);
