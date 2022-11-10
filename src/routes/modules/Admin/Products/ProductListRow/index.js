import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';

const getProductActions = product => {
  return [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
  ];
};

const ProductListRow = ({ row, onRowClick, onProductEdit, onProductView, callbck }) => {
  const onProductMenuClick = menu => {
    if (menu.action === 'view') {
      onProductView(row);
    } else if (menu.action === 'edit') {
      onProductEdit(row);
    }
  };

  const productActions = getProductActions(row);

  return (
    <TableRow hover onClick={event => onRowClick(event, row.id)} role="checkbox" tabIndex={-1} key={row.id}>
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
