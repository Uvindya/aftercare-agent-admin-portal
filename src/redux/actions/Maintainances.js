import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/common/config';
import {
  //GET_ALL_MAINTAINANCES,
  DELETE_BULK_MAINTAINANCES,
  DELETE_MAINTAINANCE,
  EDIT_MAINTAINANCE,
  GET_MAINTAINANCES,
  SET_MAINTAINANCE_DETAILS,
  SET_FULL_MAINTAINANCE_DETAILS,
  GET_MY_MAINTAINANCES,
} from '../../@jumbo/constants/ActionTypes';

export const getMaintainances = (filterOptions = [], searchTerm = '', callbackFun, page, size) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log(filterOptions)
    axios
      .get('/tasks/maintainances', {
        params: { page, size, searchTerm, sort: 'modifiedAt,desc' },
      })
      .then(response => {
        //console.log(data)
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MAINTAINANCES, payload: response.data.content });
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

export const getAllMaintainances = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/tasks/maintainances/all')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          //dispatch({ type: GET_ALL_MAINTAINANCES, payload: response.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const getMyMaintainances = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/tasks/maintainances/my-assigns')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MY_MAINTAINANCES, payload: response.data });
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

export const setCurrentMaintainance = maintainance => {
  return dispatch => {
    dispatch({ type: SET_MAINTAINANCE_DETAILS, payload: maintainance });
  };
};

export const setDetailedCurrentMaintainance = maintainance => {
  return dispatch => {
    dispatch({ type: SET_FULL_MAINTAINANCE_DETAILS, payload: maintainance });
  };
};

export const getDetailedCurrentMaintainance = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`/tasks/maintainances/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: SET_FULL_MAINTAINANCE_DETAILS,
            payload: response.data,
          });
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

export const startMaintainance = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`/tasks/maintainances/${id}/start`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
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

export const completeMaintainance = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`/tasks/maintainances/${id}/complete`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
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

export const addNewMaintainance = (maintainance, callbackFun) => {
  //console.log(maintainance)
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/tasks/maintainances', maintainance)
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess('New maintainance was added successfully.'));
          //dispatch({ type: ADD_MAINTAINANCE, payload: data.data });
          dispatch(getMaintainances([], '', callbackFun, 0, 10));
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

export const assignTechnicianToMaintainnance = (assignTechInfo, callbackFun) => {
  //console.log(maintainance)
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/tasks/maintainances/assign', assignTechInfo)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('Assign technician to maintainance was successfull.'));
          //dispatch({ type: ADD_MAINTAINANCE, payload: data.data });
          dispatch(getMaintainances([], '', callbackFun, 0, 10));
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

export const sentMailToMaintainance = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to maintainance successfully'));
  };
};

export const updateMaintainance = (maintainance, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/maintainances', maintainance)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected maintainance was updated successfully.'));
          dispatch({ type: EDIT_MAINTAINANCE, payload: data.data });
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

export const updateMaintainanceStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/auth/change/status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('maintainance status was updated successfully.'));
          dispatch(getMaintainances([], '', callbackFun, 0, 10));
          //dispatch({ type: EDIT_MAINTAINANCE, payload: response.data });
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

export const deleteBulkMaintainances = (maintainanceIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/maintainances/bulk-delete', { maintainanceIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('Selected maintainances were deleted successfully.'));
          dispatch({ type: DELETE_BULK_MAINTAINANCES, payload: maintainanceIds });
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

export const deleteMaintainance = (maintainanceId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete('/maintainances', { params: { id: maintainanceId } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected maintainance was deleted successfully.'));
          dispatch({ type: DELETE_MAINTAINANCE, payload: maintainanceId });
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
