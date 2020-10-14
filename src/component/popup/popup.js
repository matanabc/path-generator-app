import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class Popup extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={this.props.close}>cancel</Button>
                    <Button onClick={this.props.confirm}>confirm</Button>
                </Modal.Footer>
            </Modal >
        );
    };
}

export default Popup;
