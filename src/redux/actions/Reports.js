import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/common/config';
import {
  GET_REPORT_KEYS,
  BR_REPORT_KEY_CHANGED,
  MR_REPORT_KEY_CHANGED,
  UMR_REPORT_KEY_CHANGED,
  TWS_REPORT_KEY_CHANGED,
  DASHBOARD_SUMMARY_LOADED,
} from '../../@jumbo/constants/ActionTypes';

/*export const getBreakdowns = (filterOptions = [], searchTerm = '', callbackFun, page, size) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log(filterOptions)
    axios
      .get('/tasks/breakdowns', {
        params: { page, size, searchTerm, sort: 'modifiedAt,desc' },
      })
      .then(response => {
        //console.log(data)
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_BREAKDOWNS, payload: response.data.content });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};*/

export const getReportKeys = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/reports/keys')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_REPORT_KEYS, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const getDashboardSummary = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/reports/dashboard')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: DASHBOARD_SUMMARY_LOADED, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const downloadBreakdownReport = (from, to, keys) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post(`/reports/breakdown?from=${from}&to=${to}`, keys, {
        responseType: 'blob',
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess());
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Breakdown_Report_${from}-${to}.csv`); //or any other extension
          document.body.appendChild(link);
          link.click();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const downloadMaintainanceReport = (from, to, keys) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post(`/reports/maintainance?from=${from}&to=${to}`, keys, {
        responseType: 'blob',
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess());
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Maintainance_Report_${from}-${to}.csv`); //or any other extension
          document.body.appendChild(link);
          link.click();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const downloadWorksheetReport = (from, to, keys, technician) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post(`/reports/worksheet?from=${from}&to=${to}&technicianId=${technician}`, keys, {
        responseType: 'blob',
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess());
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Worksheet_Report_${from}-${to}.csv`); //or any other extension
          document.body.appendChild(link);
          link.click();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const downloadUpcommingMaintainanceReport = (from, to, keys) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post(`/reports/maintainance/upcomming?from=${from}&to=${to}`, keys, {
        responseType: 'blob',
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess());
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Upcomming_Maintainance_Report_${from}-${to}.csv`); //or any other extension
          document.body.appendChild(link);
          link.click();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const changeBreakdownReportKey = (key, selected) => {
  return dispatch => {
    dispatch({ type: BR_REPORT_KEY_CHANGED, payload: { key, selected } });
  };
};

export const changeMaintainanceReportKey = (key, selected) => {
  return dispatch => {
    dispatch({ type: MR_REPORT_KEY_CHANGED, payload: { key, selected } });
  };
};

export const changeUpcommingMaintainanceReportKey = (key, selected) => {
  return dispatch => {
    dispatch({ type: UMR_REPORT_KEY_CHANGED, payload: { key, selected } });
  };
};

export const changeWorksheetReportKey = (key, selected) => {
  return dispatch => {
    dispatch({ type: TWS_REPORT_KEY_CHANGED, payload: { key, selected } });
  };
};
