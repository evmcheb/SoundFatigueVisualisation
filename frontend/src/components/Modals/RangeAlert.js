import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const RangeAlert = (props) => {
    const {
        className,
        modalTitle,
        modalDescription,
        alert,
        onClickOk
    } = props;

    return (
        <div>
            <Modal isOpen={alert} className={className}>
                <ModalHeader >{modalTitle}</ModalHeader>
                <ModalBody>
                    {modalDescription}
                </ModalBody>
                <ModalFooter className={"modal-alert-footer"}>
                    <Button color="primary" onClick={onClickOk}>ok</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default RangeAlert;