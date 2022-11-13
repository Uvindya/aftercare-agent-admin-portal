import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Block, CheckCircleOutline, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import { useDispatch } from 'react-redux';
import { updateClientStatus } from '../../../../../redux/actions/Clients';

const getClientActions = client => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
  ];
  if (client.status) {
    actions.push({ action: 'disable', label: 'Disable', icon: <Block /> });
  } else {
    actions.push({
      action: 'enable',
      label: 'Enable',
      icon: <CheckCircleOutline />,
    });
  }
  return actions;
};

const ClientListRow = ({ row, onRowClick, onClientEdit, onClientView, callbck }) => {
  const dispatch = useDispatch();

  const onClientMenuClick = menu => {
    if (menu.action === 'view') {
      onClientView(row);
    } else if (menu.action === 'edit') {
      onClientEdit(row);
    } else if (menu.action === 'disable') {
      dispatch(updateClientStatus({ username: row.email, status: 'false' }, callbck));
    } else if (menu.action === 'enable') {
      dispatch(updateClientStatus({ username: row.email, status: 'true' }, callbck));
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
