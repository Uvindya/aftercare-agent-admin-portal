import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TechnicianListRow from './TechnicianListRow';
import TechnicianTableHead from './TechnicianTableHead';
import TechniciansTableToolbar from './TechniciansTableToolbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTechnician,
  getTechnicians,
  setCurrentTechnician,
  getDetailedCurrentTechnician,
  setDetailedCurrentTechnician,
} from '../../../../redux/actions/Technicians';
import AddEditTechnician from './AddEditTechnician';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '../../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import TechnicianDetailView from './TechnicianDetailView';
import NoRecordFound from './NoRecordFound';
import ImportTechnician from './ImportTechnician';

const headCells = [
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

const TechniciansModule = () => {
  const classes = useStyles();
  const { technicians } = useSelector(({ technicianReducer }) => technicianReducer);
  const [orderBy, setOrderBy] = React.useState('id');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openTechnicianDialog, setOpenTechnicianDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState({ name: '' });
  const [techniciansFetched, setTechniciansFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalElements, setTotalElements] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [openImportTechnicianDialog, setOpenImportTechnicianDialog] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getTechnicians(
        filterOptions,
        debouncedSearchTerm,
        data => {
          setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
          setTechniciansFetched(true);
          setTotalElements(data.totalElements);
        },
        page,
        rowsPerPage,
      ),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm, page, rowsPerPage]);

  const updateTechnicianTableInfoCallBack = data => {
    setTotalElements(data.totalElements);
  };

  const handleCloseTechnicianDialog = () => {
    setOpenTechnicianDialog(false);
    dispatch(setCurrentTechnician(null));
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

  const handleTechnicianView = technician => {
    dispatch(getDetailedCurrentTechnician(technician.id, () => setOpenViewDialog(true)));
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setDetailedCurrentTechnician(null));
  };

  const handleTechnicianEdit = technician => {
    dispatch(setCurrentTechnician(technician));
    setOpenTechnicianDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    dispatch(deleteTechnician(selectedTechnician.id));
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleCloseImportTechnicianDialog = () => {
    setOpenImportTechnicianDialog(false);
    //dispatch(setCurrentClient(null));
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TechniciansTableToolbar
          onTechnicianAdd={setOpenTechnicianDialog}
          onTechnicianImport={setOpenImportTechnicianDialog}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
            <TechnicianTableHead headers={headCells} />
            <TableBody>
              {!!technicians.length ? (
                technicians.map((row, index) => (
                  <TechnicianListRow
                    key={index}
                    row={row}
                    onRowClick={handleRowClick}
                    onTechnicianEdit={handleTechnicianEdit}
                    onTechnicianView={handleTechnicianView}
                    isSelected={isSelected}
                    callbck={updateTechnicianTableInfoCallBack}
                  />
                ))
              ) : (
                <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={7} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                    ) : (
                      <NoRecordFound>
                        {techniciansFetched ? 'There are no records found.' : 'Loading technicians...'}
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

      {openTechnicianDialog && (
        <AddEditTechnician
          open={openTechnicianDialog}
          onCloseDialog={handleCloseTechnicianDialog}
          callbck={updateTechnicianTableInfoCallBack}
        />
      )}
      {openViewDialog && <TechnicianDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}
      {openImportTechnicianDialog && (
        <ImportTechnician
          open={openImportTechnicianDialog}
          onCloseDialog={handleCloseImportTechnicianDialog}
          callbck={updateTechnicianTableInfoCallBack}
        />
      )}

      <ConfirmDialog
        open={openConfirmDialog}
        title={`Confirm delete ${selectedTechnician.name}`}
        content={'Are you sure, you want to  delete this technician?'}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default TechniciansModule;
