import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import BreakdownListRow from './BreakdownListRow';
import BreakdownTableHead from './BreakdownTableHead';
import BreakdownTableToolbar from './BreakdownsTableToolbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBreakdowns,
  setCurrentBreakdown,
  getDetailedCurrentBreakdown,
  setDetailedCurrentBreakdown,
} from '../../../../redux/actions/Breakdowns';
import AddEditBreakdown from './AddEditBreakdown';
import AssignTechnician from './AssignTechnician';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import BreakdownDetailView from './BreakdownDetailView';
import NoRecordFound from './NoRecordFound';
import ImportBreakdowns from './ImportBreakdown';

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
  {
    id: 'breakdownType',
    numeric: false,
    disablePadding: false,
    label: 'Breakdown Type',
  },
  {
    id: 'risk',
    numeric: false,
    disablePadding: false,
    label: 'Risk',
  },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

const BreakdownsModule = () => {
  const classes = useStyles();
  const { breakdowns } = useSelector(({ breakdownsReducer }) => breakdownsReducer);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openBreakdownDialog, setOpenBreakdownDialog] = useState(false);
  const [openAssignTechnicianDialog, setOpenAssignTechnicianDialog] = useState(false);
  const [breakdownsFetched, setBreakdownsFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalElements, setTotalElements] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [openImportBreakdownDialog, setOpenImportBreakdownDialog] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getBreakdowns(
        filterOptions,
        debouncedSearchTerm,
        data => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setBreakdownsFetched(true);
          setTotalElements(data.totalElements);
        },
        page,
        rowsPerPage,
      ),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm, page, rowsPerPage]);

  const updateBreakdownTableInfoCallBack = data => {
    setTotalElements(data.totalElements);
  };

  const handleCloseBreakdownDialog = () => {
    setOpenBreakdownDialog(false);
    dispatch(setCurrentBreakdown(null));
  };

  const handleCloseAssignTechnicianDialog = () => {
    setOpenAssignTechnicianDialog(false);
    dispatch(setCurrentBreakdown(null));
  };

  const handleCloseImportBreakdownDialog = () => {
    setOpenImportBreakdownDialog(false);
    //dispatch(setCurrentBreakdown(null));
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

  const handleBreakdownView = breakdown => {
    dispatch(getDetailedCurrentBreakdown(breakdown.id, () => setOpenViewDialog(true)));
  };

  const handleAssignTechnician = breakdown => {
    dispatch(getDetailedCurrentBreakdown(breakdown.id, () => setOpenAssignTechnicianDialog(true)));
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setDetailedCurrentBreakdown(null));
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <BreakdownTableToolbar
          onBreakdownAdd={setOpenBreakdownDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onBreakdownImport={setOpenImportBreakdownDialog}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <BreakdownTableHead headers={headers} />
            <TableBody>
              {!!breakdowns.length ? (
                breakdowns.map((row, index) => (
                  <BreakdownListRow
                    key={index}
                    row={row}
                    onRowClick={handleRowClick}
                    onBreakdownView={handleBreakdownView}
                    onAssignTechnician={handleAssignTechnician}
                    isSelected={isSelected}
                    callbck={updateBreakdownTableInfoCallBack}
                  />
                ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {breakdownsFetched ? 'There are no records found.' : 'Loading Breakdowns...'}
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

      {openImportBreakdownDialog && (
        <ImportBreakdowns
          open={openImportBreakdownDialog}
          onCloseDialog={handleCloseImportBreakdownDialog}
          callbck={updateBreakdownTableInfoCallBack}
        />
      )}

      {openBreakdownDialog && (
        <AddEditBreakdown
          open={openBreakdownDialog}
          onCloseDialog={handleCloseBreakdownDialog}
          callbck={updateBreakdownTableInfoCallBack}
        />
      )}
      {openAssignTechnicianDialog && (
        <AssignTechnician
          open={openAssignTechnicianDialog}
          onCloseDialog={handleCloseAssignTechnicianDialog}
          callbck={updateBreakdownTableInfoCallBack}
        />
      )}
      {openViewDialog && <BreakdownDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}
    </div>
  );
};

export default BreakdownsModule;
