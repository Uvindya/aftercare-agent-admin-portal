import React, { useEffect, useState } from 'react';
import BreakdownDetail from './BreakdownDetailView';
import AddNewBreakdown from './AddNewBreakdown';
import AddEditBreakdownNotes from './BreakdownNotes';
import PropertiesList from './BreakdownList';
import Collapse from '@material-ui/core/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import { getMyOwnsBreakdowns, getDetailedCurrentBreakdown, acceptBreakdown } from '../../../../redux/actions/Breakdowns';
import { getMyProducts } from '../../../../redux/actions/Products';

const BreakdownListing = () => {
  const { myBreakdowns, detailedCurrentBreakdown } = useSelector(({ breakdownsReducer }) => breakdownsReducer);
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [page, setPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmationTitle, setConfirmationTitle] = useState('');
  const [confirmationBody, setConfirmationBody] = useState('');
  const [selectedBreakdownId, setSelectedBreakdownId] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (myBreakdowns.length === 0) {
      loadMyBreakdowns();
    }
    filterMaintainnances(tabValue);
  }, [dispatch, tabValue, page, myBreakdowns]);

  const loadMyBreakdowns = () => {
    dispatch(getMyOwnsBreakdowns(() => filterMaintainnances()));
  };

  const filterMaintainnances = tabValue => {
    if (!tabValue) {
      setCategoryData(myBreakdowns.slice(0, page * 5));
      return;
    }

    if (tabValue === 'COMPLETED') {
      setCategoryData(myBreakdowns.filter(item => item.status === 'COMPLETED').slice(0, page * 5));
      return;
    } else if (tabValue === 'PENDING') {
      setCategoryData(
        myBreakdowns.filter(item => item.status === 'NEW' || item.status === 'TECH_ASSIGNED').slice(0, page * 5),
      );
      return;
    } else if (tabValue === 'IN_PROGRESS') {
      setCategoryData(
        myBreakdowns
          .filter(item => item.status === 'IN_PROGRESS' || item.status === 'NEEDS_CLIENTS_ACCEPTENCE')
          .slice(0, page * 5),
      );
      return;
    }
  };

  const handleConfirm = () => {
    setOpenConfirmDialog(false);
    if (type == 'ACCEPT_M') {
      dispatch(
        acceptBreakdown(selectedBreakdownId, () => {
          dispatch(getMyOwnsBreakdowns(() => filterMaintainnances()));
          setTabValue('COMPLETED');
        }),
      );
    }
  };

  const handleCancel = () => {
    setOpenConfirmDialog(false);
  };

  const handlePageChange = () => {
    setPage(page + 1);
  };

  const onChangeTab = value => {
    setSearchText('');
    setPage(1);
    setTabValue(value);
  };

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const getFilteredData = () => {
    if (searchText) {
      return categoryData.filter(
        item =>
          item.productName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase()),
      );
    } else return categoryData;
  };

  const handleBreakdownClick = (type, breakdown) => {
    if (type == 'MORE_DETAILS') {
      dispatch(
        getDetailedCurrentBreakdown(breakdown.id, () => {
          setSelectedBreakdown(true);
          setSelectedType(type);
        }),
      );
    } else if (type == 'NOTES') {
      dispatch(
        getDetailedCurrentBreakdown(breakdown.id, () => {
          setSelectedBreakdown(true);
          setSelectedType(type);
        }),
      );
    } else if (type == 'NEW') {
      dispatch(
        getMyProducts(() => {
          setSelectedBreakdown(true);
          setSelectedType(type);
        }),
      );
    } else if (type == 'ACCEPT_M') {
      setConfirmationTitle('Confirm Breakdown Acceptance');
      setConfirmationBody('Are you sure you want to accept this Breakdown as a completed ? ');
      setOpenConfirmDialog(true);
      setSelectedBreakdownId(breakdown.id);
      setType(type);
    } else if (type == 'REFRESH') {
      loadMyBreakdowns();
    }
  };

  const showBreakdownList = () => setSelectedBreakdown(null);

  const data = getFilteredData();

  return (
    <React.Fragment>
      <Collapse in={selectedBreakdown} timeout="auto" unmountOnExit>
        {selectedType == 'MORE_DETAILS' && (
          <BreakdownDetail selectedBreakdown={detailedCurrentBreakdown} showBreakdownList={showBreakdownList} />
        )}
        {selectedType == 'NOTES' && (
          <AddEditBreakdownNotes selectedBreakdown={detailedCurrentBreakdown} showBreakdownList={showBreakdownList} />
        )}
        {selectedType == 'NEW' && <AddNewBreakdown showBreakdownList={showBreakdownList} callbck={loadMyBreakdowns} />}
      </Collapse>

      <Collapse in={!selectedBreakdown} timeout="auto" unmountOnExit>
        <PropertiesList
          onBreakdownClick={handleBreakdownClick}
          tabValue={tabValue}
          onChangeTab={onChangeTab}
          data={data}
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          handlePageChange={handlePageChange}
        />
      </Collapse>
      <ConfirmDialog
        open={openConfirmDialog}
        title={confirmationTitle}
        content={confirmationBody}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </React.Fragment>
  );
};

export default BreakdownListing;
