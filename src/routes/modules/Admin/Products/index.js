import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ProductListRow from './ProductListRow';
import ProductTableHead from './ProductTableHead';
import ProductTableToolbar from './ProductsTableToolbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  setCurrentProduct,
  getDetailedCurrentProduct,
  setDetailedCurrentProduct,
} from '../../../../redux/actions/Products';
import AddEditProduct from './AddEditProduct';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import ProductDetailView from './ProductDetailView';
import NoRecordFound from './NoRecordFound';
import ImportProducts from './ImportProducts';

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
  { id: 'erpId', numeric: false, disablePadding: false, label: 'ERP ID' },
  {
    id: 'warrentyPeriod',
    numeric: false,
    disablePadding: false,
    label: 'Warrenty Period',
  },
  {
    id: 'clientName',
    numeric: false,
    disablePadding: false,
    label: 'Client Name',
  },
  {
    id: 'serialNumber',
    numeric: false,
    disablePadding: false,
    label: 'Serial Number',
  },
];

const ProductsModule = () => {
  const classes = useStyles();
  const { products } = useSelector(({ productsReducer }) => productsReducer);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [productsFetched, setProductsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalElements, setTotalElements] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [openImportProductDialog, setOpenImportProductDialog] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProducts(
        filterOptions,
        debouncedSearchTerm,
        data => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setProductsFetched(true);
          setTotalElements(data.totalElements);
        },
        page,
        rowsPerPage,
      ),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm, page, rowsPerPage]);

  const updateProductTableInfoCallBack = data => {
    setTotalElements(data.totalElements);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
    dispatch(setCurrentProduct(null));
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleProductView = product => {
    dispatch(getDetailedCurrentProduct(product.id, () => setOpenViewDialog(true)));
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setDetailedCurrentProduct(null));
  };

  const handleProductEdit = product => {
    dispatch(setCurrentProduct(product));
    setOpenProductDialog(true);
  };

  const handleCloseImportProductDialog = () => {
    setOpenImportProductDialog(false);
    //dispatch(setCurrentProduct(null));
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ProductTableToolbar
          onProductAdd={setOpenProductDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onProductImport={setOpenImportProductDialog}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <ProductTableHead headers={headers} />
            <TableBody>
              {!!products.length ? (
                products.map((row, index) => (
                  <ProductListRow
                    key={index}
                    row={row}
                    onRowClick={handleRowClick}
                    onProductEdit={handleProductEdit}
                    onProductView={handleProductView}
                    isSelected={isSelected}
                    callbck={updateProductTableInfoCallBack}
                  />
                ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {productsFetched ? 'There are no records found.' : 'Loading products...'}
                      </NoRecordFound>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>

      {openProductDialog && (
        <AddEditProduct
          open={openProductDialog}
          onCloseDialog={handleCloseProductDialog}
          callbck={updateProductTableInfoCallBack}
        />
      )}
      {openViewDialog && <ProductDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}
      {openImportProductDialog && (
        <ImportProducts
          open={openImportProductDialog}
          onCloseDialog={handleCloseImportProductDialog}
          callbck={updateProductTableInfoCallBack}
        />
      )}
    </div>
  );
};

export default ProductsModule;
