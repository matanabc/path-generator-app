import { FiCircle, FiCheckCircle } from 'react-icons/fi';
import { changeDirection } from '../../redux/path/actions';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';

class ToolsPathDirection extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.getButtonIcon = this.getButtonIcon.bind(this);
	}

	componentDidMount() {
		const Mousetrap = require('mousetrap');
		Mousetrap.bind('c', this.onClick);
	}

	onClick() {
		if (this.props.path) this.props.changeDirection();
	}

	getButtonIcon() {
		if (this.props.path && this.props.isPathReverse) return <FiCheckCircle className="mr-2" />;
		return <FiCircle className="mr-2" />;
	}

	render() {
		return (
			<Button
				size="lg"
				className="mr-3"
				onClick={this.onClick}
				disabled={!this.props.path || this.props.path.isTurnInPlace()}
			>
				{this.getButtonIcon()}
				in reverse
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.paths[state.selectedPath],
		isPathReverse: state.selectedPath ? state.paths[state.selectedPath].isReverse() : false,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeDirection: () => dispatch(changeDirection()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsPathDirection);
