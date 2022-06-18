import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const SoilMoisture = lazy(() => import('./environment-factors/SoilMoisture'));
const Temperature = lazy(() => import('./environment-factors/Temperature'));
const Air = lazy(() => import('./environment-factors/Air'));
const Light = lazy(() => import('./environment-factors/Light'));
const Schedule = lazy(() => import('./control-scheduler/schedule'));
const Prediction = lazy(() => import('./prediction/Prediction'));
const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));
const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />

          <Route path="/environment-factors/soil" component={ SoilMoisture } />
          <Route path="/environment-factors/temperature" component={ Temperature }/>
          <Route path="/environment-factors/light" component={ Light }/>
          <Route path="/environment-factors/air" component={ Air }/>
          
          <Route path="/control-scheduler/schedule" component={ Schedule }/>
          <Route path="/prediction" component={ Prediction }/>


          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />

          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;