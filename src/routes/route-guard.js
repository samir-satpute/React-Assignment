import secureStorage from "../util/secureStorage";
import { adminRoute, customerRoute, sellerRoute, publicRoutes } from "./user-specific-routes";

//validation about routes and user role
const routeGuard = async (to, from, next) => {

  const userData = secureStorage.getItem("userData")
  if (to.meta.auth && userData) {
    if (userData.userType === 'customer' && customerRoute.includes(to.location.pathname)) {
      next();
    }
    if (userData.userType === 'seller' && sellerRoute.includes(to.location.pathname)) {
      next();
    }
    if (userData.userType === 'admin' && adminRoute.includes(to.location.pathname)) {
      next();
    }
    next.redirect('/signin');
  } else {
    if (publicRoutes.includes(to.location.pathname)) {
      next();
    } else {
      next.redirect('/signin');
    }
  }
};

export default routeGuard;