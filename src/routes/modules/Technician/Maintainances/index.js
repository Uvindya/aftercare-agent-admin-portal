import React, { useEffect, useState } from 'react';
import MaintainanceDetail from './MaintainanceDetailView';
import PropertiesList from './MaintainanceList';
import Collapse from '@material-ui/core/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import { getMyMaintainances, getDetailedCurrentMaintainance } from '../../../../redux/actions/Maintainances';

const MaintainanceListing = () => {
  const { myMaintainances, detailedCurrentMaintainance } = useSelector(({ maintainancesReducer }) => maintainancesReducer);
  const [selectedMaintainance, setSelectedMaintainance] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [page, setPage] = useState(1);
  const [categoryData, setCategoryData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');

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
      setCategoryData(myMaintainances.filter(item => item.status === tabValue).slice(0, page * 5));
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
