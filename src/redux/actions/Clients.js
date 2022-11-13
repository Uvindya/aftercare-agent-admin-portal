import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/common/config';
import {
  GET_ALL_CLIENTS,
  DELETE_BULK_CLIENTS,
  DELETE_CLIENT,
  EDIT_CLIENT,
  GET_CLIENTS,
  SET_CLIENT_DETAILS,
  SET_FULL_CLIENT_DETAILS,
} from '../../@jumbo/constants/ActionTypes';

export const getClients = (filterOptions = [], searchTerm = '', callbackFun, page, size) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/users/clients', {
        params: { page, size, searchTerm, sort: 'modifiedAt,desc' },
      })
      .then(response => {
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

export const getAllClients = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/users/clients/all')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_CLIENTS, payload: response.data });
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

export const setDetailedCurrentClient = client => {
  return dispatch => {
    dispatch({ type: SET_FULL_CLIENT_DETAILS, payload: client });
  };
};

export const getDetailedCurrentClient = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`/users/clients/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: SET_FULL_CLIENT_DETAILS, payload: response.data });
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

export const addNewClient = (client, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/users/clients', client)
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess('New client was added successfully.'));
          dispatch(getClients([], '', callbackFun, 0, 10));
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const importClients = (clientFile, callbackFun) => {
  var formData = new FormData();
  formData.append('file', clientFile);
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/users/clients/import', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess('Imported clients were added successfully.'));
          dispatch(getClients([], '', callbackFun, 0, 10));
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
      .put('/auth/change/status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('client status was updated successfully.'));
          dispatch(getClients([], '', callbackFun, 0, 10));
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
