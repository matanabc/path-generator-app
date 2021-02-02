import ToolsPathDirection from './tools-path-direction';
import ToolsDownloadPath from './tools-download-path';
import ToolsChangeMode from './tools-change-mode';
import ToolsDeletePath from './tools-delete-path';
import ToolsRenamePath from './tools-rename-path';
import { Container, Row } from 'react-bootstrap';
import ToolsPlayPath from './tools-play-path';
import ToolsSettings from './tools-settings';
import ToolsSelect from './tools-select';
import { connect } from 'react-redux';
import ToolsAdd from './tools-add';
import React from 'react';

class Tools extends React.Component {
	render() {
		return (
			<Container>
				<Row>
					<ToolsAdd />
					<ToolsDownloadPath />
					<ToolsSettings />
					<ToolsChangeMode />
					<ToolsSelect />
					<ToolsPlayPath />
					<ToolsDeletePath />
					<ToolsRenamePath />
					{this.props.isPathMode ? <ToolsPathDirection /> : <span />}
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPathMode: state.isPathMode,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
