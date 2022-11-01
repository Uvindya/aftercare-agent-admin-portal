import React, { useEffect, useState } from 'react';
import ReportConfig from './ReportConfig';
import PropertiesList from './ReportList';
import Collapse from '@material-ui/core/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '../../../../@jumbo/components/Common/ConfirmDialog';
import {
  getReportKeys,
  changeBreakdownReportKey,
  downloadBreakdownReport,
  changeMaintainanceReportKey,
  downloadMaintainanceReport,
} from '../../../../redux/actions/Reports';
import { getMyProducts } from '../../../../redux/actions/Products';

const ReportListing = () => {
  const { reportKeys, breakdownReportKeys, maintainanceReportKeys } = useSelector(({ reportsReducer }) => reportsReducer);
  const [selectedReport, setSelectedReport] = useState(null);
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

  const handleReportClick = (type, data) => {
    setSelectedReport(true);
    setSelectedType(type);
    setSelectedItem(data);
  };

  const onDownloadClick = (type, from, to) => {
    if (type == 'BR') {
      let selectedKeys = [];
      for (let k in breakdownReportKeys) {
        if (breakdownReportKeys[k]) {
          selectedKeys.push(k);
        }
      }
      dispatch(downloadBreakdownReport(from, to, selectedKeys));
    } else if (type == 'MR') {
      let selectedKeys = [];
      for (let k in maintainanceReportKeys) {
        if (maintainanceReportKeys[k]) {
          selectedKeys.push(k);
        }
      }
      dispatch(downloadMaintainanceReport(from, to, selectedKeys));
    }
  };

  const onBreakdownReportKeyChange = (key, selected) => {
    dispatch(changeBreakdownReportKey(key, selected));
  };

  const onMaintainanceReportKeyChange = (key, selected) => {
    dispatch(changeMaintainanceReportKey(key, selected));
  };

  const showReportList = () => setSelectedReport(null);

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
      <Collapse in={selectedReport} timeout="auto" unmountOnExit>
        {selectedType == 'BR' && (
          <ReportConfig
            keys={breakdownReportKeys}
            onReportKeyChange={onBreakdownReportKeyChange}
            selectedReport={selectedItem}
            onDownloadClick={onDownloadClick}
            showReportList={showReportList}
          />
        )}

        {selectedType == 'MR' && (
          <ReportConfig
            keys={maintainanceReportKeys}
            onReportKeyChange={onMaintainanceReportKeyChange}
            selectedReport={selectedItem}
            onDownloadClick={onDownloadClick}
            showReportList={showReportList}
          />
        )}
      </Collapse>

      <Collapse in={!selectedReport} timeout="auto" unmountOnExit>
        <PropertiesList onReportClick={handleReportClick} data={data} />
      </Collapse>
    </React.Fragment>
  );
};

export default ReportListing;
