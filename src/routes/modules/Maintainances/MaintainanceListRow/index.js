import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { sentMailToMaintainance, updateMaintainanceStatus } from '../../../../redux/actions/Maintainances';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getMaintainanceActions = maintainance => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'reschedule', label: 'Reschedule', icon: <Visibility /> },
  ];
  if (!maintainance.technicianName) {
    actions.push({ action: 'technician', label: 'Assign Technician', icon: <Edit /> });
  }
  if (maintainance.technicianName) {
    actions.push({ action: 'technician', label: 'Reassign Technician', icon: <Edit /> });
  }
  if (maintainance.status == 'SCHEDULED') {
    actions.push({ action: 'cancel', label: 'Cancel', icon: <Edit /> });
  }
  if (maintainance.status == 'IN_PROGRESS') {
    actions.push({ action: 'close', label: 'Close', icon: <Edit /> });
  }
  return actions;
};

const MaintainanceListRow = ({ row, isSelected, onRowClick, onMaintainanceEdit, onMaintainanceDelete, onAssignTechnician, onMaintainanceView, callbck }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onMaintainanceMenuClick = menu => {
    if (menu.action === 'view') {
      onMaintainanceView(row);
    } else if (menu.action === 'technician') {
      onAssignTechnician(row);
    } else if (menu.action === 'disable') {
      dispatch(updateMaintainanceStatus({ username: row.email, status: 'false' }, callbck));
    } else if (menu.action === 'enable') {
      dispatch(updateMaintainanceStatus({ username: row.email, status: 'true' }, callbck));
    } 
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const maintainanceActions = getMaintainanceActions(row);
  
  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell  align="center">{row.id}</TableCell>
      <TableCell align="center">{row.productName}</TableCell>
      <TableCell align="center">
        {row.scheduledDate}
      </TableCell>
      <TableCell align="center">{row.clientName}</TableCell>
      <TableCell align="center">{row.technicianId == 0 ? 'No' : 'Yes'}</TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={maintainanceActions} onItemClick={onMaintainanceMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(MaintainanceListRow);
