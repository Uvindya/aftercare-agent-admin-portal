import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import { setAuthUser, setForgetPassMailSent, updateLoadUser } from '../../../redux/actions/Auth';
import React from 'react';
import axios from '../../common/config';

const JWTAuth = {
  onRegister: ({ name, email, password }) => {
    return dispatch => {
      dispatch(fetchStart());
      axios
        .post('auth/register', {
          email: email,
          password: password,
          name: name,
        })
        .then(({ data }) => {
          if (data.result) {
            localStorage.setItem('token', data.access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
            dispatch(fetchSuccess());
            dispatch(JWTAuth.getAuthUser(true, data.access_token));
          } else {
            dispatch(fetchError(data.error));
          }
        })
        .catch(function(error) {
          dispatch(fetchError(error.message));
        });
    };
  },

  onLogin: ({ email, password }) => {
    return dispatch => {
      try {
        dispatch(fetchStart());
        axios
          .post('auth/signin', {
            username: email,
            password: password,
          })
          .then(({ data }) => {
            if (data) {
              localStorage.setItem('token', data.accessToken);
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
              dispatch(fetchSuccess());
              dispatch(JWTAuth.getAuthUser(true, data.accessToken));
            } else {
              dispatch(fetchError(data.error));
            }
          })
          .catch(function(error) {
            dispatch(fetchError('Invalid Username or Password'));
          });
      } catch (error) {
        dispatch(fetchError('Invalid Username or Password'));
      }
    };
  },
  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());
      dispatch(fetchSuccess());
      localStorage.removeItem('token');
      dispatch(setAuthUser(null));
      /*axios
        .post('auth/logout')
        .then(({ data }) => {
          if (data.result) {
            dispatch(fetchSuccess());
            localStorage.removeItem('token');
            dispatch(setAuthUser(null));
          } else {
            dispatch(fetchError(data.error));
          }
        })
        .catch(function(error) {
          dispatch(fetchError(error.message));
        });*/
    };
  },

  getAuthUser: (loaded = false, token) => {
    return dispatch => {
      if (!token) {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      }
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));
      axios
        .post('auth/me')
        .then(({ data }) => {
          if (data) {
            dispatch(fetchSuccess());
            dispatch(setAuthUser(data));
          } else {
            dispatch(updateLoadUser(true));
          }
        })
        .catch(function(error) {
          dispatch(updateLoadUser(true));
        });
    };
  },

  onForgotPassword: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(setForgetPassMailSent(true));
        dispatch(fetchSuccess());
      }, 300);
    };
  },
  getSocialMediaIcons: () => {
    return <React.Fragment> </React.Fragment>;
  },
};

export default JWTAuth;
