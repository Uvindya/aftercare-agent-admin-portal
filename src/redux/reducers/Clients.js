import {
  ADD_CLIENT,
  DELETE_BULK_CLIENTS,
  DELETE_CLIENT,
  EDIT_CLIENT,
  GET_CLIENTS,
  SET_CLIENT_DETAILS,
  SET_FULL_CLIENT_DETAILS,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  clients: [],
  currentClient: null,
  detailedCurrentClient: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CLIENTS: {
      return {
        ...state,
        clients: action.payload,
      };
    }
    case SET_CLIENT_DETAILS: {
      return {
        ...state,
        currentClient: action.payload,
      };
    }
    case SET_FULL_CLIENT_DETAILS: {
      return {
        ...state,
        detailedCurrentClient: action.payload,
      };
    }
    case ADD_CLIENT: {
      return {
        ...state,
        clients: [action.payload, ...state.clients],
      };
    }
    case EDIT_CLIENT: {
      return {
        ...state,
        clients: state.clients.map(client => (client.id === action.payload.id ? action.payload : client)),
      };
    }
    case DELETE_CLIENT: {
      return {
        ...state,
        clients: state.clients.filter(client => client.id !== action.payload),
      };
    }
    case DELETE_BULK_CLIENTS: {
      return {
        ...state,
        clients: state.clients.filter(client => !action.payload.includes(client.id)),
      };
    }
    default:
      return state;
  }
};
