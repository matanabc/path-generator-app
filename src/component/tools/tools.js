import ToolsPathDirection from './tools-path-direction';
import { Container, Row } from 'react-bootstrap';
import ToolsDownload from './tools-download';
import ToolsSettings from './tools-settings';
import ToolsAddPath from './tools-add-path';
import { Holonomic } from 'path-generator';
import ToolsRename from './tools-rename';
import ToolsDelete from './tools-delete';
import ToolsSelect from './tools-select';
import { connect } from 'react-redux';
import ToolsPlay from './tools-play';
import React from 'react';

class Tools extends React.Component {
	render() {
		const { driveType, isPathMode } = this.props;
		return (
			<Container>
				<Row>
					<ToolsDownload />
					<ToolsSettings />
					<ToolsSelect />
					<ToolsPlay />
					<ToolsDelete />
					<ToolsRename />
					{!isPathMode && <ToolsAddPath />}
					{isPathMode && driveType !== Holonomic && <ToolsPathDirection />}
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPathMode: state.isPathMode,
		driveType: state.driveType,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
