import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button, Chip } from '@material-ui/core';
import CmtSearch from '../../../../../@coremat/CmtSearch';
import useStyles from './index.style';

const ClientTableToolbar = ({ onClientAdd, onClientImport, searchTerm, setSearchTerm }) => {
  const classes = useStyles();

  const onSearchChipDelete = () => setSearchTerm('');

  return (
    <React.Fragment>
      <Toolbar className={clsx(classes.root)}>
        {
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            Clients{' '}
            <Button color="primary" onClick={() => onClientAdd(true)}>
              Add New Client
            </Button>
            <Button color="primary" onClick={() => onClientImport(true)}>
              Import Clients
            </Button>
          </Typography>
        }

        {
          <React.Fragment>
            <CmtSearch onChange={e => setSearchTerm(e.target.value)} value={searchTerm} border={false} onlyIcon />
            <div className={classes.chipsRoot}>
              {searchTerm && <Chip label={searchTerm} onDelete={onSearchChipDelete} />}
            </div>
          </React.Fragment>
        }
      </Toolbar>
    </React.Fragment>
  );
};

ClientTableToolbar.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onClientAdd: PropTypes.func,
  onClientImport: PropTypes.func,
};

export default React.memo(ClientTableToolbar);
