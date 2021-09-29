

//validation about routes and user role
const routeGuard = async (to, from, next) => {
    console.log("in routeGuard", to)
    if (to.meta.auth) {
      if (true) {
        next();
      }
      next.redirect('/signin');
    } else {
      next();
    }
  };

  export default routeGuard;