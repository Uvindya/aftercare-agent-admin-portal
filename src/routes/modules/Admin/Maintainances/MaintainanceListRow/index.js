import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import { useDispatch } from 'react-redux';
import { updateMaintainanceStatus } from '../../../../../redux/actions/Maintainances';

const getMaintainanceActions = maintainance => {
  const actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  if (maintainance.status === 'SCHEDULED' && !maintainance.technicianName) {
    actions.push({
      action: 'technician',
      label: 'Assign Technician',
      icon: <Edit />,
    });
  }
  if (maintainance.status !== 'COMPLETED' && maintainance.technicianName) {
    actions.push({
      action: 'technician',
      label: 'Reassign Technician',
      icon: <Edit />,
    });
  }

  if (maintainance.status !== 'COMPLETED') {
    actions.push({
      action: 'reschedule',
      label: 'Reschedule',
      icon: <Visibility />,
    });
  }
  if (maintainance.status === 'SCHEDULED') {
    actions.push({ action: 'skip', label: 'Skip', icon: <Edit /> });
  }
  return actions;
};

const MaintainanceListRow = ({ row, onRowClick, onAssignTechnician, onMaintainanceView, callbck }) => {
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
