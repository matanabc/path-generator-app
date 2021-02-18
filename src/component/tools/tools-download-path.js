import { changePopupsStatus } from '../../redux/view/actions';
import { saveCSVPath } from '../../handlers/project-handler';
import { FiDownload } from 'react-icons/fi';
import { MdError } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import mousetrap from 'mousetrap';
import 'mousetrap-global-bind';
import React from 'react';

class ToolsDownloadPath extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		mousetrap.bindGlobal(['command+s', 'alt+s'], this.onClick);
	}

	onClick() {
		if (document.activeElement) document.activeElement.blur();
		if (!this.props.path || (this.props.saveCSVTo === '' && !this.props.isWeb)) return;
		if (this.props.path.isIllegal()) this.props.showIllegalPathPopup();
		else saveCSVPath(this.props.path, this.props.pathName, this.props.saveCSVTo);
	}

	render() {
		const isPathIllegal = this.props.path && this.props.path.isIllegal();
		return (
			<Button
				size="lg"
				className="mr-3"
				onClick={this.onClick}
				disabled={!this.props.path}
				title="Save csv path to robot"
				variant={isPathIllegal ? 'danger' : 'primary'}
			>
				{isPathIllegal ? <MdError /> : <FiDownload />}
			</Button>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path,
		isWeb: state.isWeb,
		saveCSVTo: state.saveCSVTo,
		pathName: state.selectedPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showIllegalPathPopup: () => dispatch(changePopupsStatus('pathIsIllegalPopup')),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsDownloadPath);
