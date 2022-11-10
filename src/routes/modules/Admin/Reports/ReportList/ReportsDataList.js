import React from 'react';
import ReportItem from './ReportItem';

const ReportsDataList = ({ data, onReportClick }) => {
  return data.map(item => <ReportItem item={item} onReportClick={onReportClick} />);
};

export default ReportsDataList;
