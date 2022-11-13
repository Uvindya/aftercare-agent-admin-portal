import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from '../../services/common/config';
import {
  GET_ALL_PRODUCTS,
  DELETE_BULK_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
  SET_PRODUCT_DETAILS,
  SET_FULL_PRODUCT_DETAILS,
  GET_MY_PRODUCTS,
} from '../../@jumbo/constants/ActionTypes';

export const getProducts = (filterOptions = [], searchTerm = '', callbackFun, page, size) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/products', {
        params: { page, size, searchTerm, sort: 'modified_at,desc' },
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_PRODUCTS, payload: response.data.content });
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

export const getAllProducts = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/products/all')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const getMyProducts = callbackFun => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/products/my')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MY_PRODUCTS, payload: response.data });
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

export const setCurrentProduct = product => {
  return dispatch => {
    dispatch({ type: SET_PRODUCT_DETAILS, payload: product });
  };
};

export const setDetailedCurrentProduct = product => {
  return dispatch => {
    dispatch({ type: SET_FULL_PRODUCT_DETAILS, payload: product });
  };
};

export const getDetailedCurrentProduct = (id, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get(`/products/${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: SET_FULL_PRODUCT_DETAILS, payload: response.data });
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

export const addNewProduct = (product, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/products', product)
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess('New product was added successfully.'));
          dispatch(getProducts([], '', callbackFun, 0, 10));
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const sentMailToProduct = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to product successfully'));
  };
};

export const updateProduct = (product, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/products', product)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected product was updated successfully.'));
          dispatch({ type: EDIT_PRODUCT, payload: data.data });
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

export const updateProductStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/auth/change/status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('product status was updated successfully.'));
          dispatch(getProducts([], '', callbackFun, 0, 10));
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const deleteBulkProducts = (productIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/products/bulk-delete', { productIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('Selected products were deleted successfully.'));
          dispatch({ type: DELETE_BULK_PRODUCTS, payload: productIds });
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

export const deleteProduct = (productId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete('/products', { params: { id: productId } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected product was deleted successfully.'));
          dispatch({ type: DELETE_PRODUCT, payload: productId });
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

export const importProducts = (productFile, callbackFun) => {
  var formData = new FormData();
  formData.append('file', productFile);
  return dispatch => {
    dispatch(fetchStart());
    axios
      .post('/products/import', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.status === 201) {
          dispatch(fetchSuccess('Imported products were added successfully.'));
          dispatch(getProducts([], '', callbackFun, 0, 10));
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
