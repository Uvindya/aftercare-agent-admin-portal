import React, { useEffect, useState } from 'react';
import MaintainanceDetail from './MaintainanceDetailView';
import AddEditMaintainanceNotes from './MaintainanceNotes';
import PropertiesList from './MaintainanceList';
import Collapse from '@material-ui/core/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import {
  getMyMaintainances,
  getDetailedCurrentMaintainance,
  startMaintainance,
  completeMaintainance,
} from '../../../../redux/actions/Maintainances';

const MaintainanceListing = () => {
  const { myMaintainances, detailedCurrentMaintainance } = useSelector(({ maintainancesReducer }) => maintainancesReducer);
  const [selectedMaintainance, setSelectedMaintainance] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [page, setPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmationTitle, setConfirmationTitle] = useState('');
  const [confirmationBody, setConfirmationBody] = useState('');
  const [selectedMaintainanceId, setSelectedMaintainanceId] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (myMaintainances.length === 0) {
      dispatch(getMyMaintainances(() => filterMaintainnances()));
    }
    filterMaintainnances(tabValue);
  }, [dispatch, tabValue, page, myMaintainances]);

  const filterMaintainnances = tabValue => {
    if (!tabValue) {
      setCategoryData(myMaintainances.slice(0, page * 5));
      return;
    }

    if (tabValue === 'COMPLETED') {
      setCategoryData(
        myMaintainances
          .filter(item => item.status === 'COMPLETED' || item.status === 'NEEDS_CLIENTS_ACCEPTENCE')
          .slice(0, page * 5),
      );
      return;
    }
    if (tabValue === 'BACKLOG') {
      setCategoryData(
        myMaintainances
          .filter(item => item.status === 'TECH_ASSIGNED' || item.status === 'CLIENT_ACKNOWLEDGED')
          .slice(0, page * 5),
      );
      return;
    } else if (tabValue === 'IN_PROGRESS') {
      setCategoryData(
        myMaintainances
          .filter(item => item.status === 'IN_PROGRESS' || item.status === 'NEEDS_CLIENTS_APPROVAL')
          .slice(0, page * 5),
      );
      return;
    }
  };

  const handleConfirm = () => {
    setOpenConfirmDialog(false);
    if (type == 'START_M') {
      dispatch(
        startMaintainance(selectedMaintainanceId, () => {
          dispatch(getMyMaintainances(() => filterMaintainnances()));
          setTabValue('IN_PROGRESS');
        }),
      );
    } else if (type == 'COMPLETE_M') {
      dispatch(
        completeMaintainance(selectedMaintainanceId, () => {
          dispatch(getMyMaintainances(() => filterMaintainnances()));
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
      return categoryData.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
    } else return categoryData;
  };

  const handleMaintainanceClick = (type, maintainance) => {
    if (type == 'MORE_DETAILS') {
      dispatch(
        getDetailedCurrentMaintainance(maintainance.id, () => {
          setSelectedMaintainance(true);
          setSelectedType(type);
        }),
      );
    } else if (type == 'NOTES') {
      dispatch(
        getDetailedCurrentMaintainance(maintainance.id, () => {
          setSelectedMaintainance(true);
          setSelectedType(type);
        }),
      );
    } else if (type == 'START_M') {
      setConfirmationTitle('Confirm Maintainance Start');
      setConfirmationBody('Are you sure you want to start this Maintainance ? ');
      setOpenConfirmDialog(true);
      setSelectedMaintainanceId(maintainance.id);
      setType(type);
    } else if (type == 'COMPLETE_M') {
      setConfirmationTitle('Confirm Maintainance Completion');
      setConfirmationBody('Are you sure you want to complete this Maintainance ? ');
      setOpenConfirmDialog(true);
      setSelectedMaintainanceId(maintainance.id);
      setType(type);
    }
  };

  const showMaintainanceList = () => setSelectedMaintainance(null);

  const data = getFilteredData();

  return (
    <React.Fragment>
      <Collapse in={selectedMaintainance} timeout="auto" unmountOnExit>
        {selectedType == 'MORE_DETAILS' && (
          <MaintainanceDetail
            selectedMaintainance={detailedCurrentMaintainance}
            showMaintainanceList={showMaintainanceList}
          />
        )}
        {selectedType == 'NOTES' && (
          <AddEditMaintainanceNotes
            selectedMaintainance={detailedCurrentMaintainance}
            showMaintainanceList={showMaintainanceList}
          />
        )}
      </Collapse>

      <Collapse in={!selectedMaintainance} timeout="auto" unmountOnExit>
        <PropertiesList
          onMaintainanceClick={handleMaintainanceClick}
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

      {/*{selectedMaintainance ? (
        <MaintainanceDetail selectedMaintainance={selectedMaintainance} showMaintainanceList={showMaintainanceList} />
      ) : (
        <PropertiesList
          onMaintainanceClick={handleMaintainanceClick}
          tabValue={tabValue}
          onChangeTab={onChangeTab}
          data={data}
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          handlePageChange={handlePageChange}
        />
      )}*/}
    </React.Fragment>
  );
};

export default MaintainanceListing;
