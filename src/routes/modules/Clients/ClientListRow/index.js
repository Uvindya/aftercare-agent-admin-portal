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
    { action: 'email', label: 'Email', icon: <Mail /> },
  ];

  if (client.status === 'active') {
    actions.push({ action: 'suspend', label: 'Suspend', icon: <Block /> });
  } else {
    actions.push({
      action: 'activate',
      label: 'Reactivate',
      icon: <CheckCircleOutline />,
    });
  }

  actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  return actions;
};

const ClientListRow = ({ row, isSelected, onRowClick, onClientEdit, onClientDelete, onClientView }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClientMenuClick = menu => {
    if (menu.action === 'view') {
      onClientView(row);
    } else if (menu.action === 'edit') {
      onClientEdit(row);
    } else if (menu.action === 'email') {
      dispatch(sentMailToClient());
    } else if (menu.action === 'suspend') {
      dispatch(updateClientStatus({ id: row.id, status: 'suspended' }));
    } else if (menu.action === 'activate') {
      dispatch(updateClientStatus({ id: row.id, status: 'active' }));
    } else if (menu.action === 'delete') {
      onClientDelete(row);
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
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.profile_pic} alt={row.name} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.name}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>
        {row.status === 'suspended' ? `Suspended by ${row.suspendedBy} (${timeFromNow(row.suspendedAt)})` : row.status}
      </TableCell>
      <TableCell>{timeFromNow(row.lastLoginAt)}</TableCell>
      <TableCell align="right">{row.emailUsage} GB</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={clientActions} onItemClick={onClientMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ClientListRow);
