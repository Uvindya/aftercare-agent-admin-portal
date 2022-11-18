import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { rescheduleMaintainnance } from '../../../../../redux/actions/Maintainances';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  techInput: {
    width: '400px',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.dark,
    },
  },
}));

const RescheduleMaintainance = ({ open, onCloseDialog, callbck }) => {
  const classes = useStyles();
  const currentMaintainance = useSelector(({ maintainancesReducer }) => maintainancesReducer.detailedCurrentMaintainance);

  const [scheduledDate, setScheduleDate] = useState('');
  const [taskId, setTaskId] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setTaskId(currentMaintainance.id);
    if (currentMaintainance) {
      setScheduleDate(new Date(currentMaintainance.scheduledDate).toISOString().split('T')[0]);
    }
  }, [currentMaintainance, dispatch]);

  const onSubmitClick = () => {
    onReschedule();
  };

  const onReschedule = () => {
    const rescheduleInfo = {
      scheduledDate,
    };
    dispatch(
      rescheduleMaintainnance(taskId, rescheduleInfo, data => {
        callbck(data);
        onCloseDialog();
      }),
    );
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>Reschedule Maintenance</DialogTitle>
      <DialogContent dividers className={classes.techInput}>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            type="date"
            variant="outlined"
            label="Purchased At"
            value={scheduledDate}
            onChange={e => {
              setScheduleDate(e.target.value);
            }}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleMaintainance;

RescheduleMaintainance.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
  callbck: PropTypes.func,
};
