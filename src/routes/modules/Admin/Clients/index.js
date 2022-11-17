import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import ClientListRow from './ClientListRow';
import ClientTableHead from './ClientTableHead';
import ClientTableToolbar from './ClientsTableToolbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getClients,
  setCurrentClient,
  getDetailedCurrentClient,
  setDetailedCurrentClient,
} from '../../../../redux/actions/Clients';
import AddEditClient from './AddEditClient';
import ImportClient from './ImportClient';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import ClientDetailView from './ClientDetailView';
import NoRecordFound from './NoRecordFound';

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

const ClientsModule = () => {
  const classes = useStyles();
  const { clients } = useSelector(({ clientsReducer }) => clientsReducer);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [openImportClientDialog, setOpenImportClientDialog] = useState(false);
  const [clientsFetched, setClientsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalElements, setTotalElements] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getClients(
        filterOptions,
        debouncedSearchTerm,
        data => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setClientsFetched(true);
          setTotalElements(data.totalElements);
        },
        page,
        rowsPerPage,
      ),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm, page, rowsPerPage]);

  const updateClientTableInfoCallBack = data => {
    setTotalElements(data.totalElements);
  };

  const handleCloseClientDialog = () => {
    setOpenClientDialog(false);
    dispatch(setCurrentClient(null));
  };

  const handleCloseImportClientDialog = () => {
    setOpenImportClientDialog(false);
    //dispatch(setCurrentClient(null));
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

  const handleClientView = client => {
    dispatch(getDetailedCurrentClient(client.id, () => setOpenViewDialog(true)));
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setDetailedCurrentClient(null));
  };

  const handleClientEdit = client => {
    dispatch(setCurrentClient(client));
    setOpenClientDialog(true);
    dispatch(getDetailedCurrentClient(client.id));
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ClientTableToolbar
          onClientAdd={setOpenClientDialog}
          onClientImport={setOpenImportClientDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <ClientTableHead headers={headers} />
            <TableBody>
              {!!clients.length ? (
                clients.map((row, index) => (
                  <ClientListRow
                    key={index}
                    row={row}
                    onRowClick={handleRowClick}
                    onClientEdit={handleClientEdit}
                    onClientView={handleClientView}
                    isSelected={isSelected}
                    callbck={updateClientTableInfoCallBack}
                  />
                ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                    ) : (
                      <NoRecordFound>{clientsFetched ? 'There are no records found.' : 'Loading clients...'}</NoRecordFound>
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

      {openClientDialog && (
        <AddEditClient
          open={openClientDialog}
          onCloseDialog={handleCloseClientDialog}
          callbck={updateClientTableInfoCallBack}
        />
      )}
      {openImportClientDialog && (
        <ImportClient
          open={openImportClientDialog}
          onCloseDialog={handleCloseImportClientDialog}
          callbck={updateClientTableInfoCallBack}
        />
      )}
      {openViewDialog && <ClientDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}
    </div>
  );
};

export default ClientsModule;
