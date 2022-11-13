import {
  GET_REPORT_KEYS,
  BR_REPORT_KEY_CHANGED,
  MR_REPORT_KEY_CHANGED,
  TWS_REPORT_KEY_CHANGED,
  UMR_REPORT_KEY_CHANGED,
  DASHBOARD_SUMMARY_LOADED,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  reportKeys: {},
  breakdownReportKeys: {},
  maintainanceReportKeys: {},
  worksheetReportKeys: {},
  dashboardSummary: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REPORT_KEYS: {
      let bk = {};
      action.payload.breakdownKeys.forEach(k => {
        bk[k] = true;
      });

      let mk = {};
      action.payload.maintainanceKeys.forEach(k => {
        mk[k] = true;
      });

      let wsk = {};
      action.payload.worksheetKeys.forEach(k => {
        wsk[k] = true;
      });

      return {
        ...state,
        reportKeys: action.payload,
        breakdownReportKeys: bk,
        maintainanceReportKeys: mk,
        worksheetReportKeys: wsk,
      };
    }
    case BR_REPORT_KEY_CHANGED: {
      return {
        ...state,
        breakdownReportKeys: {
          ...state.breakdownReportKeys,
          [action.payload.key]: action.payload.selected,
        },
      };
    }
    case MR_REPORT_KEY_CHANGED: {
      return {
        ...state,
        maintainanceReportKeys: {
          ...state.maintainanceReportKeys,
          [action.payload.key]: action.payload.selected,
        },
      };
    }
    case TWS_REPORT_KEY_CHANGED: {
      return {
        ...state,
        worksheetReportKeys: {
          ...state.worksheetReportKeys,
          [action.payload.key]: action.payload.selected,
        },
      };
    }
    case UMR_REPORT_KEY_CHANGED: {
      return {
        ...state,
        maintainanceReportKeys: {
          ...state.maintainanceReportKeys,
          [action.payload.key]: action.payload.selected,
        },
      };
    }
    case DASHBOARD_SUMMARY_LOADED: {
      return {
        ...state,
        dashboardSummary: action.payload,
      };
    }
    default:
      return state;
  }
};
