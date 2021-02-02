import { changeMode } from '../../redux/view/actions';
import { BiMovie, BiEdit } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsChangeMode extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		mousetrap.bindGlobal(['command+m', 'alt+m'], this.onClick);
	}

	onClick() {
		if (document.activeElement) document.activeElement.blur();
		this.props.changeMode();
	}

	render() {
		const title = this.props.isPathMode ? 'Change to paths group mode' : 'Change to path mode';
		return (
			<Button size="lg" className="mr-3" onClick={this.onClick} title={title}>
				{this.props.isPathMode ? <BiMovie /> : <BiEdit />}
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPathMode: state.isPathMode,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeMode: () => dispatch(changeMode()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsChangeMode);
