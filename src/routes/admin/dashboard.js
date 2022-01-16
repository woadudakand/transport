import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = lazy(() => import('../../container/dashboard'));
const Registration = lazy(() => import('../../container/registration/Registration'));
const Permission = lazy(() => import('../../container/registration/Permission'));
const Articles = lazy(() => import('../../container/masters/articles/Articles'));

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
      <Route path={`${path}/social`} component={Dashboard} />
      <Route path={`${path}/registration`} component={Registration} />
      <Route path={`${path}/permission`} component={Permission} />
      <Route path={`${path}/articles`} component={Articles} />
    </Switch>
  );
};

export default DashboardRoutes;
