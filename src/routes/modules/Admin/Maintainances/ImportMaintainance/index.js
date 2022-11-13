import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import CmtImage from '../../../../../@coremat/CmtImage';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import { requiredMessage } from '../../../../../@jumbo/constants/ErrorMessages';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { importMaintainances } from '../../../../../redux/actions/Maintainances';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  csv_logo: {
    width: '50%',
    margin: '0 25%',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.dark,
    },
  },
}));

const ImportMaintainance = ({ open, onCloseDialog }) => {
  const classes = useStyles();

  const [maintainanceFile, setMaintainanceFile] = useState('');

  const [maintainanceFileError, setMaintainanceFileError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'text/csv',
    onDrop: acceptedFiles => {
      setMaintainanceFile(acceptedFiles[0]);
    },
  });

  const dispatch = useDispatch();

  const onSubmitClick = () => {
    if (!maintainanceFile) {
      setMaintainanceFileError(requiredMessage);
    } else {
      onUserSave();
    }
  };

  const onUserSave = () => {
    dispatch(
      importMaintainances(maintainanceFile, () => {
        onCloseDialog();
      }),
    );
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>Import Maintainances</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtImage src={'/images/auth/csv_logo.png'} className={classes.csv_logo} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            {maintainanceFile && (
              <Button variant="contained" color="primary" onClick={onSubmitClick}>
                Import
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImportMaintainance;

ImportMaintainance.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
