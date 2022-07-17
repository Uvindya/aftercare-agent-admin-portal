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
import { sentMailToClient, updateClientStatus } from '../../../../redux/actions/Clients';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getClientActions = client => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
  ];
  if (client.status) {
    actions.push({ action: 'suspend', label: 'Suspend', icon: <Block /> });
  } else {
    actions.push({ action: 'activate', label: 'Reactivate', icon: <CheckCircleOutline />,});
  }
  return actions;
};

const ClientListRow = ({ row, isSelected, onRowClick, onClientEdit, onClientDelete, onClientView, callbck }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClientMenuClick = menu => {
    if (menu.action === 'view') {
      onClientView(row);
    } else if (menu.action === 'edit') {
      onClientEdit(row);
    } else if (menu.action === 'suspend') {
      dispatch(updateClientStatus({ username: row.email, status: 'false' }, callbck));
    } else if (menu.action === 'activate') {
      dispatch(updateClientStatus({ username: row.email, status: 'true' }, callbck));
    } 
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const clientActions = getClientActions(row);
  
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
      <TableCell align="center">{row.primaryPhoneNo}</TableCell>
      <TableCell align="center">{row.status ? 'Enable' : 'Disable'}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={clientActions} onItemClick={onClientMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ClientListRow);
