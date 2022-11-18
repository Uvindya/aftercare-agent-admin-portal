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
    id: 'productName',
    numeric: false,
    disablePadding: false,
    label: 'Product Name',
  },
  {
    id: 'scheduledDate',
    numeric: false,
    disablePadding: false,
    label: 'Scheduled Date',
  },
  {
    id: 'clientName',
    numeric: false,
    disablePadding: false,
    label: 'Client Name',
  },
  {
    id: 'technicianId',
    numeric: false,
    disablePadding: false,
    label: 'Technician Assigned',
  },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function MaintainanceTableHead() {
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

export default React.memo(MaintainanceTableHead);
