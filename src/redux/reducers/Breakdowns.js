import {
  ADD_BREAKDOWN,
  DELETE_BULK_BREAKDOWNS,
  DELETE_BREAKDOWN,
  EDIT_BREAKDOWN,
  GET_BREAKDOWNS,
  SET_BREAKDOWN_DETAILS,
  SET_FULL_BREAKDOWN_DETAILS,
  //GET_ALL_BREAKDOWNS,
  GET_MY_BREAKDOWNS,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  breakdowns: [],
  myBreakdowns: [],
  allBreakdowns: [],
  currentBreakdown: null,
  detailedCurrentBreakdown: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BREAKDOWNS: {
      return {
        ...state,
        breakdowns: action.payload,
      };
    }
    case GET_MY_BREAKDOWNS: {
      return {
        ...state,
        myBreakdowns: action.payload,
      };
    }
    //case GET_ALL_BREAKDOWNS: {
    //  return {
    //    ...state,
    //    allBreakdowns: action.payload,
    //  };
    //}
    case SET_BREAKDOWN_DETAILS: {
      return {
        ...state,
        currentBreakdown: action.payload,
      };
    }
    case SET_FULL_BREAKDOWN_DETAILS: {
      return {
        ...state,
        detailedCurrentBreakdown: action.payload,
      };
    }
    case ADD_BREAKDOWN: {
      return {
        ...state,
        breakdowns: [action.payload, ...state.breakdowns],
      };
    }
    case EDIT_BREAKDOWN: {
      return {
        ...state,
        breakdowns: state.breakdowns.map(breakdown => (breakdown.id === action.payload.id ? action.payload : breakdown)),
      };
    }
    case DELETE_BREAKDOWN: {
      return {
        ...state,
        breakdowns: state.breakdowns.filter(breakdown => breakdown.id !== action.payload),
      };
    }
    case DELETE_BULK_BREAKDOWNS: {
      return {
        ...state,
        breakdowns: state.breakdowns.filter(breakdown => !action.payload.includes(breakdown.id)),
      };
    }
    default:
      return state;
  }
};
