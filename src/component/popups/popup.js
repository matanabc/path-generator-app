import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.cancelButtonRef = React.createRef();
    }

    componentDidUpdate() {
        if (!this.props.show) return;
        if (this.props.refToUse !== undefined && this.props.refToUse.current !== null)
            this.props.refToUse.current.focus();
        else if (this.cancelButtonRef.current !== null)
            this.cancelButtonRef.current.focus();
    }

    render() {
        var confirmButton = <Button onClick={this.props.confirm}>confirm</Button>;
        var cancelButton = <Button variant="outline-primary" onClick={this.props.close}
            ref={this.cancelButtonRef}>cancel</Button>;
        if (this.props.confirm === undefined) {
            confirmButton = <span />;
            cancelButton = <Button ref={this.cancelButtonRef} onClick={this.props.close}>ok</Button>
        }

        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body >
                <Modal.Footer>
                    {cancelButton}
                    {confirmButton}
                </Modal.Footer>
            </Modal >
        );
    };
}

export default Popup;
