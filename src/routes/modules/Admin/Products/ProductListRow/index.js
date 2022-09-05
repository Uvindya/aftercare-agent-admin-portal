import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { timeFromNow } from '../../../../../@jumbo/utils/dateHelper';
import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../../@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { sentMailToProduct, updateProductStatus } from '../../../../../redux/actions/Products';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getProductActions = product => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
  ];
  if (product.status) {
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

const ProductListRow = ({ row, isSelected, onRowClick, onProductEdit, onProductDelete, onProductView, callbck }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onProductMenuClick = menu => {
    if (menu.action === 'view') {
      onProductView(row);
    } else if (menu.action === 'edit') {
      onProductEdit(row);
    } else if (menu.action === 'disable') {
      dispatch(updateProductStatus({ username: row.email, status: 'false' }, callbck));
    } else if (menu.action === 'enable') {
      dispatch(updateProductStatus({ username: row.email, status: 'true' }, callbck));
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const productActions = getProductActions(row);

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
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">{row.erpId}</TableCell>
      <TableCell align="center">{row.warrentyPeriod}</TableCell>
      <TableCell align="center">{row.clientName}</TableCell>
      <TableCell align="center">{row.serialNumber}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={productActions} onItemClick={onProductMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ProductListRow);
