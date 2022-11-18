import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button, Chip } from '@material-ui/core';
import CmtSearch from '../../../../../@coremat/CmtSearch';
import useStyles from './index.style';

const ProductTableToolbar = ({ onProductAdd, searchTerm, setSearchTerm, onProductImport }) => {
  const classes = useStyles();

  const onSearchChipDelete = () => setSearchTerm('');

  return (
    <React.Fragment>
      <Toolbar className={clsx(classes.root)}>
        {
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            Products{' '}
            <Button color="primary" onClick={() => onProductAdd(true)}>
              Add New Product
            </Button>
            <Button color="primary" onClick={() => onProductImport(true)}>
              Import Products
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

ProductTableToolbar.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  onProductAdd: PropTypes.func,
  onProductImport: PropTypes.func,
};

export default React.memo(ProductTableToolbar);
