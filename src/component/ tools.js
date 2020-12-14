import { MdBuild, MdDelete, MdEdit, MdPlayArrow, MdPause, MdReplay } from 'react-icons/md';
import { Button, Container, Row, Dropdown } from 'react-bootstrap';
import { changeSelectedPath } from '../redux/path/actions';
import { FiDownload, FiCircle } from 'react-icons/fi';
import { GiClick } from 'react-icons/gi';
import { connect } from 'react-redux';
import React from 'react';
import {
	changeRangePosition,
	setDrawRobotInterval,
	changePopupsStatus,
} from '../redux/view/actions';

class Tools extends React.Component {
	constructor(props) {
		super(props);
		this.setDrawRobotInterval = this.setDrawRobotInterval.bind(this);
		this.isRangePositionInTheEnd = this.isRangePositionInTheEnd.bind(this);
	}

	isRangePositionInTheEnd() {
		return (
			this.props.path && this.props.path.sourceSetpoints.length - 1 === this.props.rangePosition
		);
	}

	setDrawRobotInterval() {
		var interval = undefined;
		if (!this.props.drawRobotInterval && this.props.path) {
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

	render() {
		var playButtonToShow = <MdPlayArrow />;
		if (this.props.drawRobotInterval) playButtonToShow = <MdPause />;
		else if (this.isRangePositionInTheEnd()) playButtonToShow = <MdReplay />;

		return (
			<Container>
				<Row>
					<Button
						size="lg"
						className="mr-3"
						variant={'primary'}
						title="Add waypoint with mouse"
						disabled={this.props.path === undefined}
					>
						<GiClick />
					</Button>
					<Button
						size="lg"
						className="mr-3"
						title="Save csv path to robot"
						disabled={this.props.path === undefined}
					>
						<FiDownload />
					</Button>
					<Button className="mr-3" size="lg" title="Settings">
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
							<Dropdown.Item as="button">New path</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Button
						className="mr-3 ml-4"
						size="lg"
						onClick={this.setDrawRobotInterval}
						disabled={this.props.path === undefined}
					>
						{playButtonToShow}
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
					<Button className="mr-3" size="lg" disabled={this.props.path === undefined}>
						<FiCircle className="mr-2" />
						in reverse
					</Button>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathName: state.path.selectedPath,
		rangePosition: state.view.rangePosition,
		pathsName: Object.keys(state.path.paths),
		path: state.path.paths[state.path.selectedPath],
		drawRobotInterval: state.view.drawRobotInterval,
		robotLoopTime: state.path.pathConfig.robotLoopTime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setDrawRobotInterval: (interval) => dispatch(setDrawRobotInterval(interval)),
		changeRangePosition: (position) => dispatch(changeRangePosition(position)),
		showDeletePathPopup: () => dispatch(changePopupsStatus('deletePathPopup')),
		showRenamePathPopup: () => dispatch(changePopupsStatus('renamePathPopup')),
		changeSelectedPath: (pathName) => dispatch(changeSelectedPath(pathName)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
