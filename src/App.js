import logo from './logo.svg';
import './App.css';
import './assets/semantic/semantic.min.css'

import { BrowserRouter,Switch,Link, Route } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';

import { authProtectedRoutes, publicRoutes } from './routes';

import routeGuard  from './routes/route-guard';



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
            // <Redirect
            //   to={{ pathname: "/signin", state: { from: props.location } }}
            // />
            <div>
            <Component {...props} />
          </div>
          );
        }
        // authorised so return component
        return (
          <div>
            <Component {...props} />
          </div>
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
        <GuardProvider guards={[routeGuard]} >
          <Switch>

            {/* public route render */}
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                {...route}
              />
            ))}
              {/* authorised route render */}
            {/* {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                {...route}
              />
            ))} */}
          </Switch>
        </GuardProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
