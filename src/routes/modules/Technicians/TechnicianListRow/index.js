import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { updateTechnicianStatus } from '../../../../redux/actions/Technicians';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getTechnicianActions = technician => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
  ];
  if (technician.status) {
    actions.push({ action: 'disable', label: 'Disable', icon: <Block /> });
  } else {
    actions.push({ action: 'enable', label: 'Enable', icon: <CheckCircleOutline />,});
  }
  return actions;
};

const TechnicianListRow = ({ row, isSelected, onRowClick, onTechnicianEdit, onTechnicianDelete, onTechnicianView, callbck }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onTechnicianMenuClick = menu => {
    if (menu.action === 'view') {
      onTechnicianView(row);
    } else if (menu.action === 'edit') {
      onTechnicianEdit(row);
    } else if (menu.action === 'disable') {
      dispatch(updateTechnicianStatus({ username: row.email, status: 'false' }, callbck));
    } else if (menu.action === 'enable') {
      dispatch(updateTechnicianStatus({ username: row.email, status: 'true' }, callbck));
    } 
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const technicianActions = getTechnicianActions(row);
  
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
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">
        {row.email}
      </TableCell>
      <TableCell align="center">
        {row.erpId}
      </TableCell>
      <TableCell align="center">{row.primaryPhoneNo}</TableCell>
      <TableCell align="center">{row.status ? 'Enable' : 'Disable'}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={technicianActions} onItemClick={onTechnicianMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(TechnicianListRow);
