import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button, Chip } from '@material-ui/core';
import CmtSearch from '../../../../../@coremat/CmtSearch';
import useStyles from './index.style';

const TechnicianTableToolbar = ({ onTechnicianAdd, searchTerm, setSearchTerm, onTechnicianImport }) => {
  const classes = useStyles();

  const onSearchChipDelete = () => setSearchTerm('');

  return (
    <React.Fragment>
      <Toolbar className={clsx(classes.root)}>
        {
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            Technicians{' '}
            <Button color="primary" onClick={() => onTechnicianAdd(true)}>
              Add New Technician
            </Button>
            <Button color="primary" onClick={() => onTechnicianImport(true)}>
              Import Technicians
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

TechnicianTableToolbar.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onTechnicianAdd: PropTypes.func,
  onTechnicianImport: PropTypes.func,
};

export default React.memo(TechnicianTableToolbar);
