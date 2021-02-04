import { deletePath, renamePath, addPath } from '../../redux/path/actions';
import { changePopupsStatus, changeRangePosition } from '../../redux/view/actions';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import Popup from './popup';
import React from 'react';

class Popups extends React.Component {
	constructor(props) {
		super(props);
		this.newPathRef = React.createRef();
		this.renamePathRef = React.createRef();
		this.renamePath = this.renamePath.bind(this);
		this.deletePath = this.deletePath.bind(this);
		this.createNewPath = this.createNewPath.bind(this);
	}

	componentDidUpdate() {
		if (this.props.popupsStatus.renamePathPopup) this.renamePathRef.current.defaultValue = this.props.pathName;
	}

	deletePath() {
		this.props.closePopups();
		this.props.deletePath();
	}

	renamePath() {
		if (this.renamePathRef.current.value) {
			this.props.renamePath(this.renamePathRef.current.value);
			this.props.closePopups();
		}
	}

	createNewPath() {
		if (this.newPathRef.current.value && !this.props.pathsName.includes(this.newPathRef.current.value)) {
			this.props.addPath(this.newPathRef.current.value);
			this.props.resetRangePosition();
			this.props.closePopups();
		}
	}

	render() {
		return (
			<div>
				<Popup
					show={this.props.popupsStatus.deletePathPopup}
					body="Are you sure you want to delete path?"
					close={this.props.closePopups}
					confirm={this.deletePath}
					title="Delete path"
				/>

				<Popup
					show={this.props.popupsStatus.renamePathPopup}
					body={<FormControl ref={this.renamePathRef} />}
					close={this.props.closePopups}
					refToUse={this.renamePathRef}
					confirm={this.renamePath}
					title="Rename path"
				/>

				<Popup
					body={<FormControl ref={this.newPathRef} placeholder="Path name" />}
					show={this.props.popupsStatus.createNewPathPopup}
					close={this.props.closePopups}
					confirm={this.createNewPath}
					refToUse={this.newPathRef}
					title="Create a new path"
				/>

				<Popup
					show={this.props.popupsStatus.pathIsIllegalPopup}
					title={this.props.path && this.props.path.isIllegal() ? this.props.path.error.info : ''}
					body={
						<div>
							{this.props.path && this.props.path.isIllegal()
								? `${this.props.path.error.problem}\n \n${this.props.path.error.solution}`
								: ''}
						</div>
					}
					close={this.props.closePopups}
				/>

				<Popup
					title={`v${this.props.newVersion} is available`}
					show={this.props.popupsStatus.newVersionPopup}
					close={this.props.closePopups}
					body={
						<div>
							{'There is a new version waiting for you to update to!\n' +
								'To update jest go to settings and click on update...'}
						</div>
					}
				/>

				<Popup
					show={
						this.props.popupsStatus.savePathToCSVPopup && this.props.saveCSVTo === '' && !this.props.isWeb
					}
					title="Save path CSV"
					body="Can't save path CSV, you need to set CSV folder path in settings!"
					close={this.props.closePopups}
				/>

				<Popup
					show={this.props.popupsStatus.savePathToCSVPopup && this.props.saveCSVTo !== ''}
					title="Save path CSV"
					body="Path CSV saved!"
					close={this.props.closePopups}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathName: state.selected ? state.selected : '',
		path: state.paths[state.selected],
		pathsName: Object.keys(state.paths),
		popupsStatus: state.popupsStatus,
		newVersion: state.newVersion,
		saveCSVTo: state.saveCSVTo,
		isWeb: state.isWeb,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetRangePosition: () => dispatch(changeRangePosition(0)),
		closePopups: () => dispatch(changePopupsStatus()),
		renamePath: (name) => dispatch(renamePath(name)),
		addPath: (name) => dispatch(addPath(name)),
		deletePath: () => dispatch(deletePath()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Popups);
