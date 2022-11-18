import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';

const getMaintainanceActions = maintainance => {
  const actions = [{ action: 'view', label: 'View' }];
  if (maintainance.status === 'SCHEDULED' && !maintainance.technicianName) {
    actions.push({
      action: 'technician',
      label: 'Assign Technician',
    });
  }
  if (maintainance.status !== 'COMPLETED' && maintainance.technicianName) {
    actions.push({
      action: 'technician',
      label: 'Reassign Technician',
    });
  }

  if (maintainance.status !== 'COMPLETED' && maintainance.status !== 'SKIPPED') {
    actions.push({
      action: 'reschedule',
      label: 'Reschedule',
    });
  }
  return actions;
};

const MaintainanceListRow = ({ row, onRowClick, onAssignTechnician, onMaintainanceView, onMaintainanceReschedule }) => {
  const onMaintainanceMenuClick = menu => {
    if (menu.action === 'view') {
      onMaintainanceView(row);
    } else if (menu.action === 'technician') {
      onAssignTechnician(row);
    } else if (menu.action === 'reschedule') {
      onMaintainanceReschedule(row);
    }
  };
  const maintainanceActions = getMaintainanceActions(row);

  return (
    <TableRow hover onClick={event => onRowClick(event, row.id)} role="checkbox" tabIndex={-1} key={row.id}>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.productName}</TableCell>
      <TableCell align="center">{row.scheduledDate}</TableCell>
      <TableCell align="center">{row.clientName}</TableCell>
      <TableCell align="center">{row.technicianId == 0 ? 'No' : 'Yes'}</TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu
          items={maintainanceActions}
          onItemClick={onMaintainanceMenuClick}
          TriggerComponent={<MoreHoriz />}
        />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(MaintainanceListRow);
