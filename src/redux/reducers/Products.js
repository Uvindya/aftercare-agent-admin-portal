import {
  ADD_PRODUCT,
  GET_ALL_PRODUCTS,
  DELETE_BULK_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS,
  SET_PRODUCT_DETAILS,
  SET_FULL_PRODUCT_DETAILS,
  GET_MY_PRODUCTS,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  products: [],
  allProducts: [],
  myProducts: [],
  currentProduct: null,
  detailedCurrentProduct: null,
  allMyProducts: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case GET_ALL_PRODUCTS: {
      return {
        ...state,
        allProducts: action.payload,
      };
    }
    case GET_MY_PRODUCTS: {
      return {
        ...state,
        allMyProducts: action.payload,
        myProducts: action.payload.map(p => {
          return { id: p.id, key: `${p.name} - ${p.erpId}` };
        }),
      };
    }
    case SET_PRODUCT_DETAILS: {
      return {
        ...state,
        currentProduct: action.payload,
      };
    }
    case SET_FULL_PRODUCT_DETAILS: {
      return {
        ...state,
        detailedCurrentProduct: action.payload,
      };
    }
    case ADD_PRODUCT: {
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    }
    case EDIT_PRODUCT: {
      return {
        ...state,
        products: state.products.map(product => (product.id === action.payload.id ? action.payload : product)),
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    }
    case DELETE_BULK_PRODUCTS: {
      return {
        ...state,
        products: state.products.filter(product => !action.payload.includes(product.id)),
      };
    }
    default:
      return state;
  }
};
