import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button, Chip } from '@material-ui/core';
import CmtSearch from '../../../../../@coremat/CmtSearch';
import useStyles from './index.style';

const filterOptionsList = [{ label: 'Active', value: 'active' }];

const MaintainanceTableToolbar = ({
  onMaintainanceAdd,
  filterOptions,
  setFilterOptions,
  searchTerm,
  setSearchTerm,
  onMaintainanceImport,
}) => {
  const classes = useStyles();

  const onChipDelete = option => {
    setFilterOptions(filterOptions.filter(item => item !== option.value));
  };

  const onSearchChipDelete = () => setSearchTerm('');

  return (
    <React.Fragment>
      <Toolbar className={clsx(classes.root)}>
        {
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            Maintenances{' '}
            <Button color="primary" onClick={() => onMaintainanceImport(true)}>
              Import Maintenances
            </Button>
          </Typography>
        }

        {
          <React.Fragment>
            <CmtSearch onChange={e => setSearchTerm(e.target.value)} value={searchTerm} border={false} onlyIcon />
            <div className={classes.chipsRoot}>
              {searchTerm && <Chip label={searchTerm} onDelete={onSearchChipDelete} />}
              {filterOptionsList.map(
                (option, index) =>
                  filterOptions.includes(option.value) && (
                    <Chip key={index} label={option.label} onDelete={() => onChipDelete(option)} />
                  ),
              )}
            </div>
          </React.Fragment>
        }
      </Toolbar>
    </React.Fragment>
  );
};

MaintainanceTableToolbar.propTypes = {
  filterOptions: PropTypes.array,
  setFilterOptions: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onMaintainanceAdd: PropTypes.func,
  onMaintainanceImport: PropTypes.func,
};

export default React.memo(MaintainanceTableToolbar);
