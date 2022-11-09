import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtImage from '../../../../../@coremat/CmtImage';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import CmtList from '../../../../../@coremat/CmtList';
import IconButton from '@material-ui/core/IconButton';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { emailNotValid, requiredMessage } from '../../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { isValidEmail } from '../../../../../@jumbo/utils/commonHelper';
import { importBreakdowns } from '../../../../../redux/actions/Breakdowns';

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

const ImportBreakdowns = ({ open, onCloseDialog }) => {
  const classes = useStyles();

  const [breakdownFile, setBreakdownFile] = useState('');

  const [breakdownFileError, setBreakdownFileError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'text/csv',
    onDrop: acceptedFiles => {
      setBreakdownFile(acceptedFiles[0]);
    },
  });

  const dispatch = useDispatch();

  const onSubmitClick = () => {
    if (!breakdownFile) {
      setBreakdownFileError(requiredMessage);
    } else {
      onUserSave();
    }
  };

  const onUserSave = () => {
    dispatch(
      importBreakdowns(breakdownFile, () => {
        onCloseDialog();
      }),
    );
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>Import Breakdowns</DialogTitle>
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
            {breakdownFile && (
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

export default ImportBreakdowns;

ImportBreakdowns.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
