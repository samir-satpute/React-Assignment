
import React from 'react'
import { Redirect } from 'react-router-dom'

import Signin from '../pages/Signin';
import Signup
 from '../pages/Signup';

 const publicRoutes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/signin" />,
    meta: { auth: false },
  },
    {
        path: '/signin',
        exact: true,
        component: Signin,
        meta: { auth: false },
      },
      {
        path: '/signup',
        exact: true,
        component: Signup,
        meta: { auth: false },
      },
 ];
const authProtectedRoutes = [];



// Home (Books listing): ${domain}   				(Public)
// Signin: ${domain}/signin     					(Public)
// Signup: ${domain}/signup						(Public)
// Book List : ${domain}/admin/books 				(Private Admin)
// Create book: ${domain}/admin/books/create 			(Private Admin)
// Details book: ${domain}/admin/books/${:id}  (Read only)  	(Private Admin)
// Edit book: ${domain}/admin/books/${:id}  (Editable)   		(Private Admin)
// Order: ${domain}/order    						(Private Customer)
// My Order: ${domain}/my-orders    				(Private Customer)


export { authProtectedRoutes, publicRoutes }