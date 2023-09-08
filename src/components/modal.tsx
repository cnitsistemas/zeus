import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { ReactElement, useRef } from "react";

interface PropsDialog {
  title: String;
  content: String | ReactElement<any, any>;
  cancelButton: Boolean;
  cancelButtonText: String;
  confirmButton: Boolean;
  confirmButtonError: Boolean;
  confirmButtonText: String;
  handleConfirm: () => void;
  openDialog: boolean;
  setCloseDialog: () => void;
  size: any;
};

export default function ModalComponent({
  openDialog,
  setCloseDialog,
  title,
  content,
  cancelButton,
  cancelButtonText,
  confirmButton,
  confirmButtonError,
  confirmButtonText,
  handleConfirm,
  size,
  ...props
}: PropsDialog) {
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <Modal
        isOpen={openDialog}
        onClose={setCloseDialog}
        motionPreset='slideInBottom'
        size={size}
        {...props}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {content}
          </ModalBody>

          <ModalFooter>
            {cancelButton && <Button ref={cancelRef} onClick={setCloseDialog}>
              {cancelButtonText}
            </Button>}
            {confirmButton && confirmButtonError ? <Button colorScheme='red' ml={3} onClick={handleConfirm}>
              {confirmButtonText}
            </Button> : confirmButton ? <Button colorScheme='orange' ml={3} onClick={handleConfirm}>
              {confirmButtonText}
            </Button> : <></>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}