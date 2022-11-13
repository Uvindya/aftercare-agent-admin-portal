import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import React from 'react';

function ClientTableHead({ headers }) {
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

ClientTableHead.propTypes = {
  headers: PropTypes.array.isRequired,
};

export default React.memo(ClientTableHead);
