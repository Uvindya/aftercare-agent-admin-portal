import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';

const getBreakdownActions = breakdown => {
  const actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  if (breakdown.status === 'NEW' && !breakdown.technicianName) {
    actions.push({
      action: 'technician',
      label: 'Assign Technician',
      icon: <Edit />,
    });
  }
  if (breakdown.status !== 'COMPLETED' && breakdown.technicianName) {
    actions.push({
      action: 'technician',
      label: 'Reassign Technician',
      icon: <Edit />,
    });
  }
  if (breakdown.status === 'NEW') {
    actions.push({ action: 'cancel', label: 'Cancel', icon: <Edit /> });
  }

  return actions;
};

const BreakdownListRow = ({ row, onRowClick, onAssignTechnician, onBreakdownView, onCancelBreakdown }) => {
  const onBreakdownMenuClick = menu => {
    if (menu.action === 'view') {
      onBreakdownView(row);
    } else if (menu.action === 'technician') {
      onAssignTechnician(row);
    } else if (menu.action === 'cancel') {
      onCancelBreakdown(row);
    }
  };

  const breakdownActions = getBreakdownActions(row);

  return (
    <TableRow hover onClick={event => onRowClick(event, row.id)} role="checkbox" tabIndex={-1} key={row.id}>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.productName}</TableCell>
      <TableCell align="center">{row.clientName}</TableCell>
      <TableCell align="center">{row.technicianId == 0 ? 'No' : 'Yes'}</TableCell>
      <TableCell align="center">{row.breakdownType}</TableCell>
      <TableCell align="center">{row.riskLevel}</TableCell>
      <TableCell align="center">{row.status}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={breakdownActions} onItemClick={onBreakdownMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(BreakdownListRow);
