import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BreakdownPage from './Pages/BreakdownPage';
import DashboardPage from './Pages/DashboardPage';
import ClientModule from './modules/Clients';
import ProductModule from './modules/Products';
import TechnicianModule from './modules/Technicians';
import MaintainanceModule from './modules/Maintainances';
import ReportsPage from './Pages/ReportPage';
import MaintainancePage from './Pages/MaintainancePage';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import ForgotPasswordPage from './Auth/ForgotPassword';

const RestrictedRoute = ({ component: Component, permission, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        (authUser && permission === authUser.role) ? (
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

const getLandingPage = (role) => {
  switch(role){
    case "TECHNICIAN":
      return <Redirect to={'/technician/maintainances'} />;
    default:
      return <Redirect to={'/dashboard'} />;
  }
}

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return getLandingPage(authUser?authUser.role:null);
  } else if (authUser && (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password')) {
    return getLandingPage(authUser?authUser.role:null);
  }

  return (
    <React.Fragment>
      <Switch>
        <RestrictedRoute path="/dashboard" component={DashboardPage}  permission="ADMIN"/>
        <RestrictedRoute path="/breakdowns" component={BreakdownPage}   permission="ADMIN"/>
        <RestrictedRoute path="/clients" component={ClientModule}   permission="ADMIN"/>
        <RestrictedRoute path="/maintainances" component={MaintainanceModule} permission="ADMIN"/>
        <RestrictedRoute path="/reports" component={ReportsPage}   permission="ADMIN"/>
        <RestrictedRoute path="/technicians" component={TechnicianModule}   permission="ADMIN"/>
        <RestrictedRoute path="/products" component={ProductModule}   permission="ADMIN"/>
        <RestrictedRoute path="/technician/maintainances" component={MaintainancePage} permission="TECHNICIAN"/>
        <RestrictedRoute path="/technician/breakdowns" component={BreakdownPage} permission="TECHNICIAN"/>
        <Route path="/signin" component={Login}/>
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
