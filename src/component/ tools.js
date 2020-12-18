import { MdBuild, MdDelete, MdEdit, MdPlayArrow, MdPause, MdReplay, MdError } from 'react-icons/md';
import { changeSelectedPath, changeDirection } from '../redux/path/actions';
import { FiDownload, FiCircle, FiCheckCircle } from 'react-icons/fi';
import { Button, Container, Row, Dropdown } from 'react-bootstrap';
import { saveCSVPath } from '../handlers/project-handler';
import { GiClick } from 'react-icons/gi';
import { connect } from 'react-redux';
import React from 'react';
import {
	changeListenToMouseStatus,
	setDrawRobotInterval,
	changeRangePosition,
	changePopupsStatus,
} from '../redux/view/actions';

class Tools extends React.Component {
	constructor(props) {
		super(props);
		this.getPlayButton = this.getPlayButton.bind(this);
		this.savePathToCSV = this.savePathToCSV.bind(this);

		this.getCSVButton = this.getCSVButton.bind(this);
		this.setDrawRobotInterval = this.setDrawRobotInterval.bind(this);
		this.isRangePositionInTheEnd = this.isRangePositionInTheEnd.bind(this);
	}

	savePathToCSV() {
		if (this.props.path && this.props.path.isIllegal()) {
			this.props.showIllegalPathPopup();
			return;
		}
		this.props.showSaveCSVPopup();
		if (this.props.saveCSVTo === '' && !this.props.isWeb) return;
		saveCSVPath(this.props.path, this.props.pathName, this.props.saveCSVTo);
	}

	isRangePositionInTheEnd() {
		return (
			this.props.path && this.props.path.sourceSetpoints.length - 1 === this.props.rangePosition
		);
	}

	setDrawRobotInterval() {
		var interval = undefined;
		if (
			this.props.path &&
			!this.props.drawRobotInterval &&
			this.props.path.sourceSetpoints.length > 0
		) {
			if (this.isRangePositionInTheEnd()) this.props.changeRangePosition(0);
			interval = setInterval(() => {
				if (this.isRangePositionInTheEnd()) {
					this.props.setDrawRobotInterval();
					return;
				}
				this.props.changeRangePosition(this.props.rangePosition + 1);
			}, this.props.robotLoopTime * 1000);
		}
		this.props.setDrawRobotInterval(interval);
	}

	getCSVButton() {
		const isPathIllegal = this.props.path && this.props.path.isIllegal();
		return (
			<Button
				size="lg"
				className="mr-3"
				onClick={this.savePathToCSV}
				title="Save csv path to robot"
				disabled={this.props.path === undefined}
				variant={isPathIllegal ? 'danger' : 'primary'}
			>
				{isPathIllegal ? <MdError /> : <FiDownload />}
			</Button>
		);
	}

	getPlayButton() {
		if (this.props.drawRobotInterval) return <MdPause />;
		else if (this.isRangePositionInTheEnd()) return <MdReplay />;
		else return <MdPlayArrow />;
	}

	render() {
		return (
			<Container>
				<Row>
					<Button
						size="lg"
						className="mr-3"
						title="Add waypoint with mouse"
						disabled={this.props.path === undefined}
						onClick={this.props.changeListenToMouseStatus}
						variant={this.props.listenToMouseClicks ? 'success' : 'primary'}
					>
						<GiClick />
					</Button>
					{this.getCSVButton()}
					<Button className="mr-3" size="lg" title="Settings" onClick={this.props.showSettings}>
						<MdBuild />
					</Button>
					<Dropdown>
						<Dropdown.Toggle size="lg">
							{this.props.pathName ? this.props.pathName : 'Select Path'}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{this.props.pathsName.map((pathName, index) => {
								return (
									<Dropdown.Item
										as="button"
										key={index}
										onClick={() => this.props.changeSelectedPath(pathName)}
									>
										{pathName}
									</Dropdown.Item>
								);
							})}
							<Dropdown.Divider />
							<Dropdown.Item as="button" onClick={this.props.showCreateNewPathPopup}>
								New path
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Button
						className="mr-3 ml-4"
						size="lg"
						onClick={this.setDrawRobotInterval}
						disabled={this.props.path === undefined}
					>
						{this.getPlayButton()}
					</Button>
					<Button
						className="mr-3"
						size="lg"
						title="Delete path"
						variant="danger"
						onClick={this.props.showDeletePathPopup}
						disabled={this.props.path === undefined}
					>
						<MdDelete />
					</Button>
					<Button
						className="mr-3"
						size="lg"
						title="Rename path"
						onClick={this.props.showRenamePathPopup}
						disabled={this.props.path === undefined}
					>
						<MdEdit />
					</Button>
					<Button
						size="lg"
						className="mr-3"
						onClick={this.props.changeDirection}
						disabled={this.props.path === undefined || this.props.path.isTurnInPlace()}
					>
						{this.props.path && this.props.path.isReverse() ? (
							<FiCheckCircle className="mr-2" />
						) : (
							<FiCircle className="mr-2" />
						)}
						in reverse
					</Button>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isWeb: state.isWeb,
		saveCSVTo: state.saveCSVTo,
		pathName: state.selectedPath,
		rangePosition: state.rangePosition,
		pathsName: Object.keys(state.paths),
		path: state.paths[state.selectedPath],
		drawRobotInterval: state.drawRobotInterval,
		robotLoopTime: state.pathConfig.robotLoopTime,
		listenToMouseClicks: state.listenToMouseClicks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showCreateNewPathPopup: () => dispatch(changePopupsStatus('createNewPathPopup')),
		showIllegalPathPopup: () => dispatch(changePopupsStatus('pathIsIllegalPopup')),
		setDrawRobotInterval: (interval) => dispatch(setDrawRobotInterval(interval)),
		changeRangePosition: (position) => dispatch(changeRangePosition(position)),
		showSaveCSVPopup: () => dispatch(changePopupsStatus('savePathToCSVPopup')),
		showDeletePathPopup: () => dispatch(changePopupsStatus('deletePathPopup')),
		showRenamePathPopup: () => dispatch(changePopupsStatus('renamePathPopup')),
		changeSelectedPath: (pathName) => dispatch(changeSelectedPath(pathName)),
		changeListenToMouseStatus: () => dispatch(changeListenToMouseStatus()),
		showSettings: () => dispatch(changePopupsStatus('settingsPopup')),
		changeDirection: () => dispatch(changeDirection()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
