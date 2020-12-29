import ToolsPathDirection from './tools-path-direction';
import ToolsDownloadPath from './tools-download-path';
import ToolsAddWaypoint from './tools-add-waypoint';
import ToolsSelectPath from './tools-select-path';
import ToolsDeletePath from './tools-delete-path';
import ToolsRenamePath from './tools-rename-path';
import { Container, Row } from 'react-bootstrap';
import ToolsPlayPath from './tools-play-path';
import ToolsSettings from './tools-settings';
import { connect } from 'react-redux';
import React from 'react';

class Tools extends React.Component {
	render() {
		return (
			<Container>
				<Row>
					<ToolsAddWaypoint />
					<ToolsDownloadPath />
					<ToolsSettings />
					<ToolsSelectPath />
					<ToolsPlayPath />
					<ToolsDeletePath />
					<ToolsRenamePath />
					<ToolsPathDirection />
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
