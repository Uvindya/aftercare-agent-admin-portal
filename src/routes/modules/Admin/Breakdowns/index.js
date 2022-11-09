import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import BreakdownListRow from './BreakdownListRow';
import BreakdownTableHead from './BreakdownTableHead';
import BreakdownTableToolbar from './BreakdownsTableToolbar';
import { getComparator, stableSort } from '../../../../@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteBreakdown,
  getBreakdowns,
  setCurrentBreakdown,
  getDetailedCurrentBreakdown,
  setDetailedCurrentBreakdown,
} from '../../../../redux/actions/Breakdowns';
import AddEditBreakdown from './AddEditBreakdown';
import AssignTechnician from './AssignTechnician';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import BreakdownDetailView from './BreakdownDetailView';
import NoRecordFound from './NoRecordFound';
import ImportBreakdowns from './ImportBreakdown';

const BreakdownsModule = () => {
  const classes = useStyles();
  const { breakdowns } = useSelector(({ breakdownsReducer }) => breakdownsReducer);
  const [orderBy, setOrderBy] = React.useState('id');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openBreakdownDialog, setOpenBreakdownDialog] = useState(false);
  const [openAssignTechnicianDialog, setOpenAssignTechnicianDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedBreakdown, setSelectedBreakdown] = useState({
    name: '',
  });
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = breakdowns.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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

  const handleBreakdownEdit = breakdown => {
    dispatch(setCurrentBreakdown(breakdown));
    setOpenBreakdownDialog(true);
  };

  const handleBreakdownDelete = breakdown => {
    setSelectedBreakdown(breakdown);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteBreakdown(selectedBreakdown.id));
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <BreakdownTableToolbar
          selected={selected}
          setSelected={setSelected}
          onBreakdownAdd={setOpenBreakdownDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onBreakdownImport={setOpenImportBreakdownDialog}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <BreakdownTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={breakdowns.length}
            />
            <TableBody>
              {!!breakdowns.length ? (
                breakdowns.map((row, index) => (
                  <BreakdownListRow
                    key={index}
                    row={row}
                    onRowClick={handleRowClick}
                    onBreakdownEdit={handleBreakdownEdit}
                    onBreakdownDelete={handleBreakdownDelete}
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

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirm delete ${selectedBreakdown.name}`}
        content={'Are you sure, you want to  delete this breakdown?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BreakdownsModule;
