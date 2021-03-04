import { BsFileEarmarkPlus } from 'react-icons/all';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class ToolsAddPath extends React.Component {
	render() {
		return (
			<Dropdown>
				<Dropdown.Toggle size="lg">
					<BsFileEarmarkPlus />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{this.props.pathsName.map((element, index) => {
						return (
							<Dropdown.Item as="button" key={index}>
								{element}
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathsName: Object.keys(state.paths),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsAddPath);
