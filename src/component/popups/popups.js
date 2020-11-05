import React from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import Settings from '../settings/settings'
import Popup from "./popup";
import {
  changePopupStatus, changePathName, deletePath, createNewPath
} from "./popups-action";

class Popups extends React.Component {
  constructor(props) {
    super(props);
    this.createNewPath = this.createNewPath.bind(this);
    this.renamePath = this.renamePath.bind(this);
    this.newPathInput = React.createRef();
    this.renamePathInput = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.paths.length === 0) return;
    if (this.props.popupsStatus.renamePathPopup)
      this.renamePathInput.current.defaultValue = this.props.paths[this.props.pathID].name;
  }

  createNewPath() {
    if (this.newPathInput.current.value)
      this.props.createNewPath(this.newPathInput.current.value);
  }

  renamePath() {
    if (this.renamePathInput.current.value)
      this.props.changePathName(this.renamePathInput.current.value);
  }

  render() {
    return (
      <div>
        <Popup show={this.props.popupsStatus.deletePathPopup && this.props.paths.length > 0}
          title="Delete path"
          body="Are you sure you want to delete path?"
          close={this.props.closeDeletePathPopup}
          confirm={this.props.deletePath}
        />

        <Popup show={this.props.popupsStatus.renamePathPopup && this.props.paths.length > 0}
          title="Rename path"
          body={<FormControl ref={this.renamePathInput} />}
          close={this.props.closeRenamePathPopup}
          refToUse={this.renamePathInput}
          confirm={this.renamePath}
        />

        <Popup show={this.props.popupsStatus.createNewPathPopup}
          title="Create a new path"
          body={<FormControl ref={this.newPathInput} placeholder="Path name" />}
          close={this.props.closeCreateNewPathPopup}
          confirm={this.createNewPath}
        />

        <Popup show={this.props.popupsStatus.savePathCSVPopup && this.props.saveCSVTo === ""}
          title="Save path CSV"
          body="Can't save path CSV, you need to set CSV folder path in settings!"
          close={this.props.closeSavePathCSVPopup}
        />

        <Popup show={this.props.popupsStatus.savePathCSVPopup && this.props.saveCSVTo !== ""}
          title="Save path CSV"
          body="Path CSV saved!"
          close={this.props.closeSavePathCSVPopup}
        />

        <Popup show={this.props.popupsStatus.pathIsIllegal}
          title={this.props.path ? this.props.path.error : ""}
          body={<div>{this.props.path ? this.props.path.splineError : ""}</div>}
          close={this.props.closePathIsIllegal}
        />
        <Settings />
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    popupsStatus: state.popupsStatus,
    saveCSVTo: state.saveCSVTo,
    pathID: state.pathID,
    paths: state.paths,
    path: state.path,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeCreateNewPathPopup: () => dispatch(changePopupStatus("createNewPathPopup")),
    closeSavePathCSVPopup: () => dispatch(changePopupStatus("savePathCSVPopup")),
    closeRenamePathPopup: () => dispatch(changePopupStatus("renamePathPopup")),
    closeDeletePathPopup: () => dispatch(changePopupStatus("deletePathPopup")),
    closePathIsIllegal: () => dispatch(changePopupStatus("pathIsIllegal")),
    changePathName: pathName => dispatch(changePathName(pathName)),
    createNewPath: pathName => dispatch(createNewPath(pathName)),
    deletePath: () => dispatch(deletePath()),
  };
}

const popups = connect(mapStateToProps, mapDispatchToProps)(Popups);
export default popups;