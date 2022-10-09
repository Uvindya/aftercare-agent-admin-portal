import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/common/config';
import {
  //GET_ALL_BREAKDOWNS,
  DELETE_BULK_BREAKDOWNS,
  DELETE_BREAKDOWN,
  EDIT_BREAKDOWN,
  GET_BREAKDOWNS,
  SET_BREAKDOWN_DETAILS,
  SET_FULL_BREAKDOWN_DETAILS,
  GET_MY_BREAKDOWNS,
} from '../../@jumbo/constants/ActionTypes';

export const getBreakdowns = (filterOptions = [], searchTerm = '', callbackFun, page, size) => {
  return dispatch => {
    dispatch(fetchStart());
    //console.log(filterOptions)
    axios
      .get('/tasks/breakdowns', {
        params: { page, size, searchTerm, sort: 'modifiedAt,desc' },
      })
      .then(response => {
        //console.log(data)
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_BREAKDOWNS, payload: response.data.content });
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

export const getAllBreakdowns = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/tasks/breakdowns/all')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          //dispatch({ type: GET_ALL_BREAKDOWNS, payload: response.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const getMyBreakdowns = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/tasks/breakdowns/my-assigns')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MY_BREAKDOWNS, payload: response.data });
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

export const getMyOwnsBreakdowns = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/tasks/breakdowns/my-ownerships')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MY_BREAKDOWNS, payload: response.data });
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

export const setCurrentBreakdown = breakdown => {
  return dispatch => {
    dispatch({ type: SET_BREAKDOWN_DETAILS, payload: breakdown });
  };
};

export const setDetailedCurrentBreakdown = breakdown => {
  return dispatch => {
    dispatch({ type: SET_FULL_BREAKDOWN_DETAILS, payload: breakdown });
  };
};

export const getDetailedCurrentBreakdown = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`/tasks/breakdowns/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: SET_FULL_BREAKDOWN_DETAILS,
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

export const startBreakdown = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`/tasks/breakdowns/${id}/start`)
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

export const appoveBreakdown = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`/tasks/breakdowns/${id}/approve`)
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

export const completeBreakdown = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`/tasks/breakdowns/${id}/complete`)
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

export const acceptBreakdown = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`/tasks/breakdowns/${id}/accept`)
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

export const breakdownNotes = (id, notes, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`/tasks/breakdowns/${id}/notes`, notes)
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

export const addNewBreakdown = (breakdown, callbackFun) => {
  //console.log(breakdown)
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/tasks/breakdowns', breakdown)
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess('New breakdown was added successfully.'));
          //dispatch({ type: ADD_BREAKDOWN, payload: data.data });
          dispatch(getBreakdowns([], '', callbackFun, 0, 10));
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
  //console.log(breakdown)
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/tasks/breakdowns/assign', assignTechInfo)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('Assign technician to breakdown was successfull.'));
          //dispatch({ type: ADD_BREAKDOWN, payload: data.data });
          dispatch(getBreakdowns([], '', callbackFun, 0, 10));
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

export const sentMailToBreakdown = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to breakdown successfully'));
  };
};

export const updateBreakdown = (breakdown, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/breakdowns', breakdown)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected breakdown was updated successfully.'));
          dispatch({ type: EDIT_BREAKDOWN, payload: data.data });
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

export const updateBreakdownStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/auth/change/status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('breakdown status was updated successfully.'));
          dispatch(getBreakdowns([], '', callbackFun, 0, 10));
          //dispatch({ type: EDIT_BREAKDOWN, payload: response.data });
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

export const deleteBulkBreakdowns = (breakdownIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/breakdowns/bulk-delete', { breakdownIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('Selected breakdowns were deleted successfully.'));
          dispatch({ type: DELETE_BULK_BREAKDOWNS, payload: breakdownIds });
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

export const deleteBreakdown = (breakdownId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete('/breakdowns', { params: { id: breakdownId } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected breakdown was deleted successfully.'));
          dispatch({ type: DELETE_BREAKDOWN, payload: breakdownId });
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
