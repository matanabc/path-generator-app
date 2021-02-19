import ToolsPathDirection from './tools-path-direction';
import ToolsChangeMode from './tools-change-mode';
import ToolsRenamePath from './tools-rename-path';
import { Container, Row } from 'react-bootstrap';
import ToolsPlayPath from './tools-play-path';
import ToolsDownload from './tools-download';
import ToolsSettings from './tools-settings';
import ToolsDelete from './tools-delete';
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
					<ToolsDownload />
					<ToolsSettings />
					<ToolsChangeMode />
					<ToolsSelect />
					<ToolsPlayPath />
					<ToolsDelete />
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
