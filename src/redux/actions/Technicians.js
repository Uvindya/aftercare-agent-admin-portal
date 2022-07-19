import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/common/config';
import {
  DELETE_BULK_TECHNICIANS,
  DELETE_TECHNICIAN,
  EDIT_TECHNICIAN,
  GET_TECHNICIANS,
  SET_TECHNICIAN_DETAILS,
  SET_FULL_TECHNICIAN_DETAILS,
} from '../../@jumbo/constants/ActionTypes';

export const getTechnicians = (filterOptions = [], searchTerm = '', callbackFun, page, size) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/users/technicians', { params: { page , size, searchTerm} })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_TECHNICIANS, payload: response.data.content });
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

export const setCurrentTechnician = technician => {
  return dispatch => {
    dispatch({ type: SET_TECHNICIAN_DETAILS, payload: technician });
  };
};

export const setDetailedCurrentTechnician = technician => {
  return dispatch => {
    dispatch({ type: SET_FULL_TECHNICIAN_DETAILS, payload: technician });
  };
};

export const getDetailedCurrentTechnician = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`/users/technicians/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: SET_FULL_TECHNICIAN_DETAILS, payload: response.data });
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

export const addNewTechnician = (technician, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/users/technicians', technician)
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess('New technician was added successfully.'));
          //dispatch({ type: ADD_CLIENT, payload: data.data });
          dispatch(getTechnicians([], '', callbackFun, 0, 10));
          //if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const sentMailToTechnician = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to technician successfully'));
  };
};

export const updateTechnician = (technician, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/technicians', technician)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected technician was updated successfully.'));
          dispatch({ type: EDIT_TECHNICIAN, payload: data.data });
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

export const updateTechnicianStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/auth/change/status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('Technician status was updated successfully.'));
          dispatch(getTechnicians([], '', callbackFun, 0, 10));
          //dispatch({ type: EDIT_TECHNICIAN, payload: response.data });
          //if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const deleteBulkTechnicians = (technicianIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/technicians/bulk-delete', { technicianIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('Selected technician were deleted successfully.'));
          dispatch({ type: DELETE_BULK_TECHNICIANS, payload: technicianIds });
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

export const deleteTechnician = (technicianId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete('/technicians', { params: { id: technicianId } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected technician was deleted successfully.'));
          dispatch({ type: DELETE_TECHNICIAN, payload: technicianId });
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
