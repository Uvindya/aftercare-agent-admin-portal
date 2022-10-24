import React, { useEffect, useState } from 'react';
import BreakdownDetail from './BreakdownDetailView';
import AddNewBreakdown from './AddNewBreakdown';
import AddEditBreakdownNotes from './BreakdownNotes';
import PropertiesList from './BreakdownList';
import Collapse from '@material-ui/core/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import { getReportKeys, changeBreakdownReportKey, downloadBreakdownReport } from '../../../../redux/actions/Reports';
import { getMyProducts } from '../../../../redux/actions/Products';

const BreakdownListing = () => {
  const { reportKeys, breakdownReportKeys } = useSelector(({ reportsReducer }) => reportsReducer);
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [tabValue, setTabValue] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmationBody, setConfirmationBody] = useState('');
  const [selectedBreakdownId, setSelectedBreakdownId] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(reportKeys).length === 0) {
      dispatch(getReportKeys());
    }
  }, [dispatch, tabValue, page, reportKeys]);

  const handleBreakdownClick = (type, breakdown) => {
    if (type == 'BR') {
      setSelectedBreakdown(true);
      setSelectedType(type);
      setSelectedItem(breakdown);
    }
    /*if (type == 'MORE_DETAILS') {
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
    }*/
  };

  const onDownloadClick = (type, from, to) => {
    console.log(type + ' ' + from + ' ' + to);
    if (type == 'BR') {
      let selectedKeys = [];
      for (let k in breakdownReportKeys) {
        if (breakdownReportKeys[k]) {
          selectedKeys.push(k);
        }
      }
      dispatch(downloadBreakdownReport(from, to, selectedKeys));
    }
  };

  const onBreakdownReportKeyChange = (key, selected) => {
    dispatch(changeBreakdownReportKey(key, selected));
  };

  const showBreakdownList = () => setSelectedBreakdown(null);

  const data = [
    {
      name: 'Breakdown Report',
      type: 'BR',
      description:
        'Some description about the card. This widget could be used to describe a project, a product, users profile or may be more.',
    },
    {
      name: 'Maintainance Report',
      type: 'MR',
      description:
        'Some description about the card. This widget could be used to describe a project, a product, users profile or may be more.',
    },
    {
      name: 'Technician Worksheet',
      type: 'TWS',
      description:
        'Some description about the card. This widget could be used to describe a project, a product, users profile or may be more.',
    },
    {
      name: 'Upcomming Maintainance Report',
      type: 'UMR',
      description:
        'Some description about the card. This widget could be used to describe a project, a product, users profile or may be more.',
    },
  ];

  return (
    <React.Fragment>
      <Collapse in={selectedBreakdown} timeout="auto" unmountOnExit>
        {selectedType == 'BR' && (
          <AddEditBreakdownNotes
            keys={breakdownReportKeys}
            onBreakdownReportKeyChange={onBreakdownReportKeyChange}
            selectedBreakdown={selectedItem}
            onDownloadClick={onDownloadClick}
            showBreakdownList={showBreakdownList}
          />
        )}
      </Collapse>

      <Collapse in={!selectedBreakdown} timeout="auto" unmountOnExit>
        <PropertiesList onBreakdownClick={handleBreakdownClick} data={data} />
      </Collapse>
    </React.Fragment>
  );
};

export default BreakdownListing;
