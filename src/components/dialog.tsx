import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import React, { ReactElement, useRef } from "react"

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

function Dialog({
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
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={setCloseDialog}
        isOpen={openDialog}
        isCentered
        size={size}
        {...props}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {content}
          </AlertDialogBody>
          <AlertDialogFooter>
            {cancelButton && <Button ref={cancelRef} onClick={setCloseDialog}>
              {cancelButtonText}
            </Button>}
            {confirmButton && confirmButtonError ? <Button colorScheme='red' ml={3} onClick={handleConfirm}>
              {confirmButtonText}
            </Button> : confirmButton ? <Button colorScheme='red' ml={3} onClick={handleConfirm}>
              {confirmButtonText}
            </Button> : <></>}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Dialog;