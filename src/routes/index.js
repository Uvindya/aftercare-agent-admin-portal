import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BreakdownPage from './Pages/BreakdownPage';
import DashboardPage from './Pages/DashboardPage';
import ClientModule from './modules/Clients';
import MaintainancePage from './Pages/MaintainancePage';
import TechnicianPage from './Pages/TechnicianPage';
import ReportsPage from './Pages/ReportPage';
import ProductPage from './Pages/ProductsPage';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import ForgotPasswordPage from './Auth/ForgotPassword';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
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

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/dashboard'} />;
  } else if (authUser && (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password')) {
    return <Redirect to={'/dashboard'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <RestrictedRoute path="/dashboard" component={DashboardPage} />
        <RestrictedRoute path="/breakdowns" component={BreakdownPage} />
        <RestrictedRoute path="/clients" component={ClientModule} />
        <RestrictedRoute path="/maintainances" component={MaintainancePage} />
        <RestrictedRoute path="/reports" component={ReportsPage} />
        <RestrictedRoute path="/technicians" component={TechnicianPage} />
        <RestrictedRoute path="/products" component={ProductPage} />
        <Route path="/signin" component={Login} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
