import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BreakdownPage from './Pages/BreakdownPage';
import DashboardPage from './Pages/DashboardPage';
import ClientModule from './modules/Admin/Clients';
import ProductModule from './modules/Admin/Products';
import TechnicianModule from './modules/Admin/Technicians';
import MaintainanceModule from './modules/Admin/Maintainances';
import ReportsPage from './Pages/ReportPage';
import MaintainancePage from './Pages/MaintainancePage';
import TechMaintainanceModule from './modules/Technician/Maintainances';
import ClientMaintainanceModule from './modules/Client/Maintainances';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import ForgotPasswordPage from './Auth/ForgotPassword';

const RestrictedRoute = ({ component: Component, permission, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser && permission === authUser.role ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const getLandingPage = role => {
  switch (role) {
    case 'TECHNICIAN':
      return <Redirect to={'/technician/maintainances'} />;
    case 'CLIENT':
      return <Redirect to={'/client/maintainances'} />;
    default:
      return <Redirect to={'/dashboard'} />;
  }
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return getLandingPage(authUser ? authUser.role : null);
  } else if (
    authUser &&
    (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password')
  ) {
    return getLandingPage(authUser ? authUser.role : null);
  }

  return (
    <React.Fragment>
      <Switch>
        <RestrictedRoute path="/dashboard" component={DashboardPage} permission="ADMIN" />
        <RestrictedRoute path="/breakdowns" component={BreakdownPage} permission="ADMIN" />
        <RestrictedRoute path="/clients" component={ClientModule} permission="ADMIN" />
        <RestrictedRoute path="/maintainances" component={MaintainanceModule} permission="ADMIN" />
        <RestrictedRoute path="/reports" component={ReportsPage} permission="ADMIN" />
        <RestrictedRoute path="/technicians" component={TechnicianModule} permission="ADMIN" />
        <RestrictedRoute path="/products" component={ProductModule} permission="ADMIN" />
        <RestrictedRoute path="/technician/maintainances" component={TechMaintainanceModule} permission="TECHNICIAN" />
        <RestrictedRoute path="/technician/breakdowns" component={BreakdownPage} permission="TECHNICIAN" />
        <RestrictedRoute path="/client/maintainances" component={ClientMaintainanceModule} permission="CLIENT" />
        <RestrictedRoute path="/client/breakdowns" component={BreakdownPage} permission="CLIENT" />
        <Route path="/signin" component={Login} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
