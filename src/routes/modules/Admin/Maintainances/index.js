import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import MaintainanceListRow from './MaintainanceListRow';
import MaintainanceTableHead from './MaintainanceTableHead';
import MaintainanceTableToolbar from './MaintainancesTableToolbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMaintainances,
  setCurrentMaintainance,
  getDetailedCurrentMaintainance,
  setDetailedCurrentMaintainance,
} from '../../../../redux/actions/Maintainances';
import AddEditMaintainance from './AddEditMaintainance';
import AssignTechnician from './AssignTechnician';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import MaintainanceDetailView from './MaintainanceDetailView';
import NoRecordFound from './NoRecordFound';
import ImportMaintainance from './ImportMaintainance';

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

const MaintainancesModule = () => {
  const classes = useStyles();
  const { maintainances } = useSelector(({ maintainancesReducer }) => maintainancesReducer);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openMaintainanceDialog, setOpenMaintainanceDialog] = useState(false);
  const [openAssignTechnicianDialog, setOpenAssignTechnicianDialog] = useState(false);
  const [maintainancesFetched, setMaintainancesFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalElements, setTotalElements] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [openImportMaintainanceDialog, setOpenImportMaintainanceDialog] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMaintainances(
        filterOptions,
        debouncedSearchTerm,
        data => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setMaintainancesFetched(true);
          setTotalElements(data.totalElements);
        },
        page,
        rowsPerPage,
      ),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm, page, rowsPerPage]);

  const updateMaintainanceTableInfoCallBack = data => {
    setTotalElements(data.totalElements);
  };

  const handleCloseMaintainanceDialog = () => {
    setOpenMaintainanceDialog(false);
    dispatch(setCurrentMaintainance(null));
  };

  const handleCloseAssignTechnicianDialog = () => {
    setOpenAssignTechnicianDialog(false);
    dispatch(setCurrentMaintainance(null));
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

  const handleMaintainanceView = maintainance => {
    dispatch(getDetailedCurrentMaintainance(maintainance.id, () => setOpenViewDialog(true)));
  };

  const handleAssignTechnician = maintainance => {
    dispatch(getDetailedCurrentMaintainance(maintainance.id, () => setOpenAssignTechnicianDialog(true)));
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setDetailedCurrentMaintainance(null));
  };

  const handleMaintainanceEdit = maintainance => {
    dispatch(setCurrentMaintainance(maintainance));
    setOpenMaintainanceDialog(true);
  };

  const handleCloseImportMaintainanceDialog = () => {
    setOpenImportMaintainanceDialog(false);
    //dispatch(setCurrentClient(null));
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MaintainanceTableToolbar
          onMaintainanceAdd={setOpenMaintainanceDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onMaintainanceImport={setOpenImportMaintainanceDialog}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <MaintainanceTableHead headers={headers} />
            <TableBody>
              {!!maintainances.length ? (
                maintainances.map((row, index) => (
                  <MaintainanceListRow
                    key={index}
                    row={row}
                    onRowClick={handleRowClick}
                    onMaintainanceEdit={handleMaintainanceEdit}
                    onMaintainanceView={handleMaintainanceView}
                    onAssignTechnician={handleAssignTechnician}
                    isSelected={isSelected}
                    callbck={updateMaintainanceTableInfoCallBack}
                  />
                ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {maintainancesFetched ? 'There are no records found.' : 'Loading maintainances...'}
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

      {openImportMaintainanceDialog && (
        <ImportMaintainance
          open={openImportMaintainanceDialog}
          onCloseDialog={handleCloseImportMaintainanceDialog}
          callbck={updateMaintainanceTableInfoCallBack}
        />
      )}

      {openMaintainanceDialog && (
        <AddEditMaintainance
          open={openMaintainanceDialog}
          onCloseDialog={handleCloseMaintainanceDialog}
          callbck={updateMaintainanceTableInfoCallBack}
        />
      )}
      {openAssignTechnicianDialog && (
        <AssignTechnician
          open={openAssignTechnicianDialog}
          onCloseDialog={handleCloseAssignTechnicianDialog}
          callbck={updateMaintainanceTableInfoCallBack}
        />
      )}
      {openViewDialog && <MaintainanceDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}
    </div>
  );
};

export default MaintainancesModule;
