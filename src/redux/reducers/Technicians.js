import {
    ADD_TECHNICIAN,
    DELETE_BULK_TECHNICIANS,
    DELETE_TECHNICIAN,
    EDIT_TECHNICIAN,
    GET_TECHNICIANS,
    SET_TECHNICIAN_DETAILS,
    SET_FULL_TECHNICIAN_DETAILS,
  } from '../../@jumbo/constants/ActionTypes';
  
  const INIT_STATE = {
    technicians: [],
    currentTechnician: null,
    detailedCurrentTechnician: null,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_TECHNICIANS: {
        return {
          ...state,
          technicians: action.payload,
        };
      }
      case SET_TECHNICIAN_DETAILS: {
        return {
          ...state,
          currentTechnician: action.payload,
        };
      }
      case SET_FULL_TECHNICIAN_DETAILS: {
        return {
          ...state,
          detailedCurrentTechnician: action.payload,
        };
      }
      case ADD_TECHNICIAN: {
        return {
          ...state,
          technicians: [action.payload, ...state.technicians],
        };
      }
      case EDIT_TECHNICIAN: {
        return {
          ...state,
          technicians: state.technicians.map(technician => (technician.id === action.payload.id ? action.payload : technician)),
        };
      }
      case DELETE_TECHNICIAN: {
        return {
          ...state,
          technicians: state.technicians.filter(technician => technician.id !== action.payload),
        };
      }
      case DELETE_BULK_TECHNICIANS: {
        return {
          ...state,
          technicians: state.technicians.filter(technician => !action.payload.includes(technician.id)),
        };
      }
      default:
        return state;
    }
  };
  