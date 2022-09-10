import {
  ADD_MAINTAINANCE,
  DELETE_BULK_MAINTAINANCES,
  DELETE_MAINTAINANCE,
  EDIT_MAINTAINANCE,
  GET_MAINTAINANCES,
  SET_MAINTAINANCE_DETAILS,
  SET_FULL_MAINTAINANCE_DETAILS,
  //GET_ALL_MAINTAINANCES,
  GET_MY_MAINTAINANCES,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  maintainances: [],
  myMaintainances: [],
  allMaintainances: [],
  currentMaintainance: null,
  detailedCurrentMaintainance: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MAINTAINANCES: {
      return {
        ...state,
        maintainances: action.payload,
      };
    }
    case GET_MY_MAINTAINANCES: {
      return {
        ...state,
        myMaintainances: action.payload,
      };
    }
    //case GET_ALL_MAINTAINANCES: {
    //  return {
    //    ...state,
    //    allMaintainances: action.payload,
    //  };
    //}
    case SET_MAINTAINANCE_DETAILS: {
      return {
        ...state,
        currentMaintainance: action.payload,
      };
    }
    case SET_FULL_MAINTAINANCE_DETAILS: {
      return {
        ...state,
        detailedCurrentMaintainance: action.payload,
      };
    }
    case ADD_MAINTAINANCE: {
      return {
        ...state,
        maintainances: [action.payload, ...state.maintainances],
      };
    }
    case EDIT_MAINTAINANCE: {
      return {
        ...state,
        maintainances: state.maintainances.map(maintainance =>
          maintainance.id === action.payload.id ? action.payload : maintainance,
        ),
      };
    }
    case DELETE_MAINTAINANCE: {
      return {
        ...state,
        maintainances: state.maintainances.filter(maintainance => maintainance.id !== action.payload),
      };
    }
    case DELETE_BULK_MAINTAINANCES: {
      return {
        ...state,
        maintainances: state.maintainances.filter(maintainance => !action.payload.includes(maintainance.id)),
      };
    }
    default:
      return state;
  }
};
