import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/common/config';
import { LOAD_NOTIFICATIONS, GET_NOTIFICATION_COUNT, MARKED_AS_READ } from '../../@jumbo/constants/ActionTypes';

export const getNotifications = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/notifications/my')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: LOAD_NOTIFICATIONS, payload: response.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const getNotificationCount = () => {
  return dispatch => {
    //dispatch(fetchStart());
    axios
      .get('/notifications/my/count')
      .then(response => {
        if (response.status === 200) {
          //dispatch(fetchSuccess());
          dispatch({ type: GET_NOTIFICATION_COUNT, payload: response.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const markAsRead = id => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put(`/notifications/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: MARKED_AS_READ, payload: response.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
