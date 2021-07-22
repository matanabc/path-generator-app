import ToolsPathDirection from './tools-path-direction';
import { Container, Row } from 'react-bootstrap';
import ToolsDownload from './tools-download';
import ToolsSettings from './tools-settings';
import ToolsAddPath from './tools-add-path';
import ToolsRename from './tools-rename';
import ToolsDelete from './tools-delete';
import ToolsSelect from './tools-select';
import { connect } from 'react-redux';
import ToolsPlay from './tools-play';
import React from 'react';

class Tools extends React.Component {
	render() {
		return (
			<Container>
				<Row>
					<ToolsDownload />
					<ToolsSettings />
					<ToolsSelect />
					<ToolsPlay />
					<ToolsDelete />
					<ToolsRename />
					{this.props.isPathMode ? <ToolsPathDirection /> : <ToolsAddPath />}
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
