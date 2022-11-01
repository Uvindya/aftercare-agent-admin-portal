import { GET_REPORT_KEYS, BR_REPORT_KEY_CHANGED, MR_REPORT_KEY_CHANGED } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  reportKeys: {},
  breakdownReportKeys: {},
  maintainanceReportKeys: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REPORT_KEYS: {
      let bk = new Object();
      action.payload.breakdownKeys.forEach(k => {
        bk[k] = true;
      });

      let mk = new Object();
      action.payload.maintainanceKeys.forEach(k => {
        mk[k] = true;
      });

      return {
        ...state,
        reportKeys: action.payload,
        breakdownReportKeys: bk,
        maintainanceReportKeys: mk,
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
    default:
      return state;
  }
};
