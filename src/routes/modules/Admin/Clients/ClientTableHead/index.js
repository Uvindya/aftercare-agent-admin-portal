import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';

const headers = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'erpId', numeric: false, disablePadding: false, label: 'ERP ID' },
  {
    id: 'primaryPhoneNo',
    numeric: false,
    disablePadding: false,
    label: 'Primary Phone No',
  },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function ClientTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headers.map(headCell => (
          <TableCell key={headCell.id} align="center" padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default React.memo(ClientTableHead);
