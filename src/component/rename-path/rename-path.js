import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, FormControl } from 'react-bootstrap';
import { close, savePathName } from "./rename-path-action";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.pathNameInput = React.createRef();
        this.save = this.save.bind(this);
    }

    save() {
        this.props.savePathName(this.pathNameInput.current.value);
    }

    render() {
        return (
            <Modal show={this.props.renamePath} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>Rename path</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl ref={this.pathNameInput}
                        defaultValue={this.props.paths.length > 0 ?
                            this.props.paths[this.props.pathID].name : ""} />
                </Modal.Body >
                <Modal.Footer>
                    <Button onClick={this.props.close}>cancel</Button>
                    <Button variant="success" onClick={this.save}>save</Button>
                </Modal.Footer>
            </Modal >
        );
    };
}

const mapStateToProps = (state) => {
    return {
        renamePath: state.renamePath,
        pathID: state.pathID,
        paths: state.paths,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(close()),
        savePathName: name => dispatch(savePathName(name)),
    };
}

const settings = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default settings;
