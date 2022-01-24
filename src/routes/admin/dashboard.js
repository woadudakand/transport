import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = lazy(() => import('../../container/dashboard'));
const Registration = lazy(() => import('../../container/registration/Registration'));
const Permission = lazy(() => import('../../container/registration/Permission'));
const Articles = lazy(() => import('../../container/masters/articles/Articles'));
const Places = lazy(() => import('../../container/masters/places/Places'));
const Branches = lazy(() => import('../../container/masters/branches/Branches'));
const Customers = lazy(() => import('../../container/masters/customers/Customers'));
const SaveCustomers = lazy(() => import('../../container/masters/customers/SaveCustomers'));

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
      <Route path={`${path}/social`} component={Dashboard} />
      <Route path={`${path}/registration`} component={Registration} />
      <Route path={`${path}/permission`} component={Permission} />
      <Route path={`${path}/articles`} component={Articles} />
      <Route path={`${path}/places`} component={Places} />
      <Route path={`${path}/branches`} component={Branches} />
      <Route path={`${path}/customers`} component={Customers} />
      <Route path={`${path}/save-customers`} component={SaveCustomers} />
    </Switch>
  );
};

export default DashboardRoutes;
