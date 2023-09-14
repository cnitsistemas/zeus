import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props: any) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

interface PropsDialog {
  title: String;
  content: String | React.ReactElement<any, any>;
  cancelButton: Boolean;
  cancelButtonText: String;
  confirmButton: Boolean;
  confirmButtonError: Boolean;
  confirmButtonText: String;
  handleConfirm: () => void;
  open: boolean;
  handleClose: () => void;
  fullWidth: boolean | undefined
  maxWidth: any;
  dividers: any;
  textAling: string
};

const CustomizedDialogs = (props: PropsDialog) => {
  const {
    open,
    handleClose,
    title,
    content,
    confirmButton,
    cancelButton,
    confirmButtonText,
    cancelButtonText,
    handleConfirm,
    confirmButtonError,
    fullWidth,
    maxWidth,
    dividers,
    textAling,
  } = props;

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers={dividers}>
          <Typography sx={{ textAlign: textAling, color: '#4f4f4f' }} gutterBottom>
            {content}
          </Typography>
        </DialogContent>
        <DialogActions>
          {cancelButton && <Button variant="outlined" autoFocus onClick={handleClose}>
            {cancelButtonText}
          </Button>}
          {confirmButton && confirmButtonError ? <Button color="error" variant="contained" autoFocus
            onClick={handleConfirm}>
            {confirmButtonText}
          </Button> : confirmButton ? <Button variant="contained" autoFocus sx={{ color: '#fff' }}
            onClick={handleConfirm}>
            {confirmButtonText}
          </Button> : <></>}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default CustomizedDialogs;

