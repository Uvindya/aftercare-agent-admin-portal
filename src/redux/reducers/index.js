import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import Clients from './Clients';
import Technicians from './Technicians';
import Products from './Products';
import Maintainances from './Maintainances'

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    clientsReducer: Clients,
    technicianReducer: Technicians,
    productsReducer: Products,
    maintainancesReducer: Maintainances,
  });
