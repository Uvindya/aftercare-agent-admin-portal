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
  updateClientStatus,
} from '../../../../redux/actions/Clients';
import AddEditClient from './AddEditClient';
import ImportClient from './ImportClient';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import ClientDetailView from './ClientDetailView';
import NoRecordFound from './NoRecordFound';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [totalElements, setTotalElements] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedClientInfo, setSelectedClientInfo] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getClients(
        debouncedSearchTerm,
        data => {
          setFilterApplied(!!debouncedSearchTerm);
          setClientsFetched(true);
          setTotalElements(data.totalElements);
        },
        page,
        rowsPerPage,
      ),
    );
  }, [dispatch, debouncedSearchTerm, page, rowsPerPage]);

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

  const handleEnableDisable = techInfo => {
    setOpenConfirmDialog(true);
    setSelectedClientInfo(techInfo);
  };

  const handleConfirm = () => {
    setOpenConfirmDialog(false);
    dispatch(updateClientStatus(selectedClientInfo, data => updateClientTableInfoCallBack(data)));
  };

  const handleCancel = () => {
    setOpenConfirmDialog(false);
  };
  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ClientTableToolbar
          onClientAdd={setOpenClientDialog}
          onClientImport={setOpenImportClientDialog}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <ClientTableHead />
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
                    onStatusChange={handleEnableDisable}
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
      <ConfirmDialog
        open={openConfirmDialog}
        title="Confirm Action"
        content={`Are you sure you want to ${selectedClientInfo.status ? 'Enable' : 'Disable'} this Client ? ${
          !selectedClientInfo.status
            ? 'Once you performed this action, Client cannot access the system'
            : 'Once you performed this action, Client can access the system'
        }`}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ClientsModule;
