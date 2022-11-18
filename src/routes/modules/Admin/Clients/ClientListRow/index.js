import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';

const getClientActions = client => {
  const actions = [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
  ];
  if (client.status) {
    actions.push({ action: 'disable', label: 'Disable' });
  } else {
    actions.push({
      action: 'enable',
      label: 'Enable',
    });
  }
  return actions;
};

const ClientListRow = ({ row, onRowClick, onClientEdit, onClientView, onStatusChange }) => {
  const onClientMenuClick = menu => {
    if (menu.action === 'view') {
      onClientView(row);
    } else if (menu.action === 'edit') {
      onClientEdit(row);
    } else if (menu.action === 'disable') {
      onStatusChange({ username: row.email, status: false });
    } else if (menu.action === 'enable') {
      onStatusChange({ username: row.email, status: true });
    }
  };
  const clientActions = getClientActions(row);

  return (
    <TableRow hover onClick={event => onRowClick(event, row.id)} role="checkbox" tabIndex={-1} key={row.id}>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">{row.erpId}</TableCell>
      <TableCell align="center">{row.primaryPhoneNo}</TableCell>
      <TableCell align="center">{row.status ? 'Enable' : 'Disable'}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={clientActions} onItemClick={onClientMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ClientListRow);
