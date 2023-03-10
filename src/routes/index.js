import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import TechnicianDashboardModule from './modules/Technician/Dashboard';
import DashboardModule from './modules/Admin/Dashboard';
import ClientModule from './modules/Admin/Clients';
import ProductModule from './modules/Admin/Products';
import TechnicianModule from './modules/Admin/Technicians';
import MaintainanceModule from './modules/Admin/Maintainances';
import BreakdownModule from './modules/Admin/Breakdowns';
import ReportModule from './modules/Admin/Reports';
import ClientDashboardModule from './modules/Client/Dashboard';
import TechMaintainanceModule from './modules/Technician/Maintainances';
import TechBreakdownModule from './modules/Technician/Breakdowns';
import ClientMaintainanceModule from './modules/Client/Maintainances';
import ClientBreakdownModule from './modules/Client/Breakdowns';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import ForgotPasswordPage from './Auth/ForgotPassword';
import TechnicianMyProfile from './modules/Technician/MyProfile';
import ClientProductModule from './modules/Client/ClientProducts';
import ResetPassWord from './modules/Client/ResetPassword';
import ClientDropDown from './modules/Admin/ClientDropDown';

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
      return <Redirect to={'/technician/dashboard'} />;
    case 'CLIENT':
      return <Redirect to={'/client/dashboard'} />;
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
        <RestrictedRoute path="/dashboard" component={DashboardModule} permission="ADMIN" />
        <RestrictedRoute path="/breakdowns" component={BreakdownModule} permission="ADMIN" />
        <RestrictedRoute path="/clients" component={ClientModule} permission="ADMIN" />
        <RestrictedRoute path="/maintainances" component={MaintainanceModule} permission="ADMIN" />
        <RestrictedRoute path="/reports" component={ReportModule} permission="ADMIN" />
        <RestrictedRoute path="/technicians" component={TechnicianModule} permission="ADMIN" />
        <RestrictedRoute path="/products" component={ProductModule} permission="ADMIN" />
        <RestrictedRoute path="/dropdown" component={ClientDropDown} permission="ADMIN" />
        <RestrictedRoute path="/technician/maintainances" component={TechMaintainanceModule} permission="TECHNICIAN" />
        <RestrictedRoute path="/technician/breakdowns" component={TechBreakdownModule} permission="TECHNICIAN" />
        <RestrictedRoute path="/technician/dashboard" component={TechnicianDashboardModule} permission="TECHNICIAN" />
        <RestrictedRoute path="/technician/profile" component={TechnicianMyProfile} permission="TECHNICIAN" />
        <RestrictedRoute path="/client/maintainances" component={ClientMaintainanceModule} permission="CLIENT" />
        <RestrictedRoute path="/client/breakdowns" component={ClientBreakdownModule} permission="CLIENT" />
        <RestrictedRoute path="/client/dashboard" component={ClientDashboardModule} permission="CLIENT" />
        <RestrictedRoute path="/client/products" component={ClientProductModule} permission="CLIENT" />
        <RestrictedRoute path="/client/resetpassword" component={ResetPassWord} permission="CLIENT" />
        <Route path="/signin" component={Login} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
