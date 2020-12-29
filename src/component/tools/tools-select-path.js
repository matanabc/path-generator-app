import { changePopupsStatus } from '../../redux/view/actions';
import { changeSelectedPath } from '../../redux/path/actions';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class ToolsSelectPath extends React.Component {
	constructor(props) {
		super(props);
		this.getPathsItem = this.getPathsItem.bind(this);
	}

	componentDidMount() {
		const Mousetrap = require('mousetrap');
		Mousetrap.bind('n', this.props.showCreateNewPathPopup);
	}

	getPathsItem() {
		return this.props.pathsName.map((pathName, index) => {
			return (
				<Dropdown.Item
					as="button"
					key={index}
					onClick={() => this.props.changeSelectedPath(pathName)}
				>
					{pathName}
				</Dropdown.Item>
			);
		});
	}

	render() {
		return (
			<Dropdown>
				<Dropdown.Toggle size="lg">
					{this.props.pathName ? this.props.pathName : 'Select Path'}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{this.getPathsItem()}
					<Dropdown.Divider />
					<Dropdown.Item as="button" onClick={this.props.showCreateNewPathPopup}>
						New path
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathsName: Object.keys(state.paths),
		pathName: state.selectedPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showCreateNewPathPopup: () => dispatch(changePopupsStatus('createNewPathPopup')),
		changeSelectedPath: (pathName) => dispatch(changeSelectedPath(pathName)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsSelectPath);
