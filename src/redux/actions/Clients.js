import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/common/config';
import {
  ADD_CLIENT,
  DELETE_BULK_CLIENTS,
  DELETE_CLIENT,
  EDIT_CLIENT,
  GET_CLIENTS,
  SET_CLIENT_DETAILS,
} from '../../@jumbo/constants/ActionTypes';

export const getClients = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log(filterOptions)
    axios
      .get('/users/clients', { params: { filterOptions, searchTerm } })
      .then(response => {
        //console.log(data)
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CLIENTS, payload: response.data.content });
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

export const setCurrentClient = client => {
  return dispatch => {
    dispatch({ type: SET_CLIENT_DETAILS, payload: client });
  };
};

export const addNewClient = (client, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/clients', client)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('New client was added successfully.'));
          dispatch({ type: ADD_CLIENT, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const sentMailToClient = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to client successfully'));
  };
};

export const updateClient = (client, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/clients', client)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected client was updated successfully.'));
          dispatch({ type: EDIT_CLIENT, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const updateClientStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/clients/update-status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('client status was updated successfully.'));
          dispatch({ type: EDIT_CLIENT, payload: response.data });
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

export const deleteBulkClients = (clientIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/clients/bulk-delete', { clientIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('Selected clients were deleted successfully.'));
          dispatch({ type: DELETE_BULK_CLIENTS, payload: clientIds });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const deleteClient = (clientId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete('/clients', { params: { id: clientId } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected client was deleted successfully.'));
          dispatch({ type: DELETE_CLIENT, payload: clientId });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
