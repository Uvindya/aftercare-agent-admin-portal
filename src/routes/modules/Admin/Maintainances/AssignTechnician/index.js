import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { requiredMessage } from '../../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { assignTechnicianToMaintainnance } from '../../../../../redux/actions/Maintainances';
import { getAllTechnicians } from '../../../../../redux/actions/Technicians';

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

const AssignTechnician = ({ open, onCloseDialog, callbck }) => {
  const classes = useStyles();
  const currentMaintainance = useSelector(({ maintainancesReducer }) => maintainancesReducer.detailedCurrentMaintainance);
  const allTechnicians = useSelector(({ technicianReducer }) => technicianReducer.allTechnicians);

  const [technicianId, setTechnicianId] = useState('');
  const [taskId, setTaskId] = useState('');

  const [technicianIdError, setTechnicianIdError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (allTechnicians.length == 0) {
      dispatch(getAllTechnicians());
    }
    setTaskId(currentMaintainance.id);
    if (currentMaintainance.technician) {
      setTechnicianId(currentMaintainance.technician.id);
      // hide password
    }
  }, [currentMaintainance, dispatch]);

  const onTechnicianChange = value => {
    setTechnicianId(value);
  };

  const onSubmitClick = () => {
    if (!technicianId) {
      setTechnicianIdError(requiredMessage);
    } else {
      onAssignTechnicain();
    }
  };

  const onAssignTechnicain = () => {
    const assignmentInfo = {
      technicianId,
      taskId,
    };
    dispatch(
      assignTechnicianToMaintainnance(assignmentInfo, data => {
        callbck(data);
        onCloseDialog();
      }),
    );
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentMaintainance ? `Reassign Technician` : `Assign Technician`}
      </DialogTitle>
      <DialogContent dividers className={classes.techInput}>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppSelectBox
            fullWidth
            data={allTechnicians}
            label="Technician"
            valueKey="id"
            variant="outlined"
            labelKey="key"
            value={technicianId}
            onChange={e => {
              onTechnicianChange(e.target.value);
              setTechnicianIdError('');
            }}
            helperText={technicianIdError}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              {currentMaintainance ? 'Update' : 'Save'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTechnician;

AssignTechnician.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
  callbck: PropTypes.func,
};
