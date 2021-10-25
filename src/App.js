import React, { Suspense } from 'react';
import './App.css';
import './assets/semantic/semantic.min.css'
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import { history } from './util/history';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { authProtectedRoutes, publicRoutes } from './routes';
import NonAuthLayout from './layout/NonAuthLayout';
import AuthLayout from './layout/AuthLayout';
import routeGuard from './routes/route-guard';
import AppLoader from './layout/AppLoader';
import ErrorBoundary from './layout/ErrorBoundry';


// handle auth and authorization layout 
const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  return (
    <GuardedRoute
      {...rest}
      render={(props) => {
        if (isAuthProtected) {   //define layout with sidebar and other side layout or anything new layour which final by designer
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
        // authorised so return component
        return (
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
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<AppLoader />}>
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
        </ErrorBoundary>
      </BrowserRouter>

    </div>
  );
}

export default App;
