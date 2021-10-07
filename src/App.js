import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/semantic/semantic.min.css'

import { BrowserRouter, Router, Switch, Link, Route } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { history } from './util/history';
import { GuardProvider, GuardedRoute } from 'react-router-guards';

import { authProtectedRoutes, publicRoutes } from './routes';
import NonAuthLayout from './layout/NonAuthLayout';
import AuthLayout from './layout/AuthLayout';

import routeGuard from './routes/route-guard';



// handle auth and authorization layout 
const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  // console.log("Approute", Component);
  return (
    <GuardedRoute
      {...rest}
      render={(props) => {
        if (isAuthProtected) {   //define layout with sidebar and other side layout or anything new layour which final by designer
          return (

            // <div>
            //   <Component {...props} />
            // </div>
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
        // authorised so return component
        return (
          // <div>
          //   <Component {...props} />
          // </div>
          <Layout>
              <Component {...props} />
            </Layout>
        );
      }}
    />
  );
};


const App = () => {

  return (
    <div className="App">
      {/* <h1>hello world</h1> */}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <GuardProvider guards={[routeGuard]} >
            <Router history={history}>

              <Switch>

                {/* public route render */}
                {publicRoutes.map((route, idx) => (
                  <AppRoute
                    path={route.path}
                    layout={NonAuthLayout}
                    component={route.component}
                    key={idx}
                    isAuthProtected={false}
                    {...route}
                  />
                ))}
                {/* authorised route render */}
                {authProtectedRoutes.map((route, idx) => (
                  <AppRoute
                    path={route.path}
                    layout={AuthLayout}
                    component={route.component}
                    key={idx}
                    isAuthProtected={true}
                    {...route}
                  />
                ))}
              </Switch>
            </Router>
          </GuardProvider>
        </Suspense>
      </BrowserRouter>

    </div>
  );
}

export default App;
