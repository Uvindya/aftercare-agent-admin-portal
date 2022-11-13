import React, { useEffect, useState } from 'react';
import ReportConfig from './ReportConfig';
import PropertiesList from './ReportList';
import Collapse from '@material-ui/core/Collapse';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReportKeys,
  changeBreakdownReportKey,
  downloadBreakdownReport,
  changeMaintainanceReportKey,
  downloadMaintainanceReport,
  changeWorksheetReportKey,
  changeUpcommingMaintainanceReportKey,
  downloadUpcommingMaintainanceReport,
  downloadWorksheetReport,
} from '../../../../redux/actions/Reports';
import { getAllTechnicians } from '../../../../redux/actions/Technicians';

const ReportListing = () => {
  const { reportKeys, breakdownReportKeys, maintainanceReportKeys, worksheetReportKeys } = useSelector(
    ({ reportsReducer }) => reportsReducer,
  );
  const allTechnicians = useSelector(({ technicianReducer }) => technicianReducer.allTechnicians);

  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(reportKeys).length === 0) {
      dispatch(getReportKeys());
    }
    if (allTechnicians.length === 0) {
      dispatch(getAllTechnicians());
    }
  }, [dispatch, reportKeys]);

  const handleReportClick = (type, data) => {
    setSelectedReport(true);
    setSelectedType(type);
    setSelectedItem(data);
  };

  const onDownloadClick = (type, from, to, technician) => {
    if (type === 'BR') {
      let selectedKeys = [];
      for (let k in breakdownReportKeys) {
        if (breakdownReportKeys[k]) {
          selectedKeys.push(k);
        }
      }
      dispatch(downloadBreakdownReport(from, to, selectedKeys));
    } else if (type === 'MR') {
      let selectedKeys = [];
      for (let k in maintainanceReportKeys) {
        if (maintainanceReportKeys[k]) {
          selectedKeys.push(k);
        }
      }
      dispatch(downloadMaintainanceReport(from, to, selectedKeys));
    } else if (type === 'TWS') {
      let selectedKeys = [];
      for (let k in worksheetReportKeys) {
        if (worksheetReportKeys[k]) {
          selectedKeys.push(k);
        }
      }
      dispatch(downloadWorksheetReport(from, to, selectedKeys, technician));
    } else if (type === 'UMR') {
      let selectedKeys = [];
      for (let k in maintainanceReportKeys) {
        if (maintainanceReportKeys[k]) {
          selectedKeys.push(k);
        }
      }
      dispatch(downloadUpcommingMaintainanceReport(from, to, selectedKeys));
    }
  };

  const onBreakdownReportKeyChange = (key, selected) => {
    dispatch(changeBreakdownReportKey(key, selected));
  };

  const onMaintainanceReportKeyChange = (key, selected) => {
    dispatch(changeMaintainanceReportKey(key, selected));
  };

  const onWorksheetReportKeyChange = (key, selected) => {
    dispatch(changeWorksheetReportKey(key, selected));
  };

  const onUpcommingMaintainanceReportKeyChange = (key, selected) => {
    dispatch(changeUpcommingMaintainanceReportKey(key, selected));
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
        {selectedType === 'BR' && (
          <ReportConfig
            keys={breakdownReportKeys}
            onReportKeyChange={onBreakdownReportKeyChange}
            selectedReport={selectedItem}
            onDownloadClick={onDownloadClick}
            showReportList={showReportList}
            type={selectedType}
          />
        )}

        {selectedType === 'MR' && (
          <ReportConfig
            keys={maintainanceReportKeys}
            onReportKeyChange={onMaintainanceReportKeyChange}
            selectedReport={selectedItem}
            onDownloadClick={onDownloadClick}
            showReportList={showReportList}
            type={selectedType}
          />
        )}

        {selectedType === 'TWS' && (
          <ReportConfig
            keys={worksheetReportKeys}
            onReportKeyChange={onWorksheetReportKeyChange}
            selectedReport={selectedItem}
            onDownloadClick={onDownloadClick}
            showReportList={showReportList}
            type={selectedType}
            technicians={allTechnicians}
          />
        )}

        {selectedType === 'UMR' && (
          <ReportConfig
            keys={maintainanceReportKeys}
            onReportKeyChange={onUpcommingMaintainanceReportKeyChange}
            selectedReport={selectedItem}
            onDownloadClick={onDownloadClick}
            showReportList={showReportList}
            type={selectedType}
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
