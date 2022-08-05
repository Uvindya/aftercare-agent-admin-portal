import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CmtList from '../../../../@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { emailNotValid, requiredMessage } from '../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { isValidEmail } from '../../../../@jumbo/utils/commonHelper';
import { importClients, updateClient } from '../../../../redux/actions/Clients';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.dark,
    },
  },
}));

const ImportClients = ({ open, onCloseDialog }) => {
  const classes = useStyles();

  const [clientFile, setClientFile] = useState('');

  const [clientFileError, setClientFileError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'text/csv',
    onDrop: acceptedFiles => {
      setClientFile(acceptedFiles[0]);
    },
  });

  const dispatch = useDispatch();

  const onSubmitClick = () => {
    if (!clientFile) {
      setClientFileError(requiredMessage);
    } else {
      onUserSave();
    }
  };

  const onUserSave = () => {
      dispatch(
        importClients(clientFile, () => {
          onCloseDialog();
        }),
      );
    };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>Import Clients</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={clientFile} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Import
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImportClients;

ImportClients.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
