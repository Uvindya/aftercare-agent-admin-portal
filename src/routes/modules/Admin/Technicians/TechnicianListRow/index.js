import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';

const getTechnicianActions = technician => {
  const actions = [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
  ];
  if (technician.status) {
    actions.push({ action: 'disable', label: 'Disable' });
  } else {
    actions.push({
      action: 'enable',
      label: 'Enable',
    });
  }
  return actions;
};

const TechnicianListRow = ({ row, onRowClick, onTechnicianEdit, onTechnicianView, onStatusChange }) => {
  const onTechnicianMenuClick = menu => {
    if (menu.action === 'view') {
      onTechnicianView(row);
    } else if (menu.action === 'edit') {
      onTechnicianEdit(row);
    } else if (menu.action === 'disable') {
      onStatusChange({ username: row.email, status: false });
    } else if (menu.action === 'enable') {
      onStatusChange({ username: row.email, status: true });
    }
  };

  const technicianActions = getTechnicianActions(row);

  return (
    <TableRow hover onClick={event => onRowClick(event, row.id)} role="checkbox" tabIndex={-1} key={row.id}>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">{row.email}</TableCell>
      <TableCell align="center">{row.erpId}</TableCell>
      <TableCell align="center">{row.primaryPhoneNo}</TableCell>
      <TableCell align="center">{row.status ? 'Enable' : 'Disable'}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={technicianActions} onItemClick={onTechnicianMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(TechnicianListRow);
