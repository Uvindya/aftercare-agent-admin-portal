import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProducts } from '../../../../redux/actions/Products';
import CmtList from '../../../../@coremat/CmtList';
import ProductItem from './ProductItem';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListEmptyResult from '../../../../@coremat/CmtList/ListEmptyResult';
const useStyles = makeStyles(theme => ({
  newsListRoot: {
    padding: 24,
    transition: 'all .2s',
    '&:not(:first-child)': {
      borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    },
    '& .fav-btn': {
      opacity: 0,
      visibility: 'hidden',
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.dark, 0.2)}`,
      '& .fav-btn': {
        opacity: 1,
        visibility: 'visible',
      },
    },
  },
}));
const ClientProductModule = () => {
  const classes = useStyles();

  //1. get relevant global state data -> before this define reducer changers and action needed
  const { allMyProducts } = useSelector(({ productsReducer }) => productsReducer);

  const dispatch = useDispatch();
  //2. load data when component load-> list
  useEffect(() => {
    if (allMyProducts.length == 0) {
      dispatch(getMyProducts());
    }
  }, [allMyProducts, dispatch]);

  //3. change cmt data variable to above global state variable and define item component as product item
  return (
    <div>
      <h1> Client Products</h1>
      <CmtList
        data={allMyProducts}
        renderRow={(item, index) => (
          <ListItem component="div" className={classes.newsListRoot} key={index}>
            <ProductItem item={item} />
          </ListItem>
        )}
        ListEmptyComponent={<ListEmptyResult title="No Result" content="No result found with your search" />}
      />
    </div>
  );
};

export default ClientProductModule;
