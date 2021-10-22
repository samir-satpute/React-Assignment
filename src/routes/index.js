
import React from 'react'
import { Redirect } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'));
const Signin = React.lazy(() => import('../pages/Signin'));
const Signup = React.lazy(() => import('../pages/Signup'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const MyOrder = React.lazy(() => import('../pages/MyOrder'));
const Users = React.lazy(() => import('../pages/Users'));
const BookList = React.lazy(() => import('../pages/BookList'));
const NotFound = React.lazy(() => import('../pages/NotFournt'));

const publicRoutes = [
  {
    path: '/',
    exact: true,
    component: Home,
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
  {
    path: '/not-fount',
    exact: true,
    component: NotFound,
    meta: { auth: false },
  },


];
const authProtectedRoutes = [
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    meta: { auth: true },
  },
  {
    path: '/my-orders',
    exact: true,
    component: MyOrder,
    meta: { auth: true },
  },
  {
    path: '/users',
    exact: true,
    component: Users,
    meta: { auth: true },
  },
  {
    path: '/book-list',
    exact: true,
    component: BookList,
    meta: { auth: true },
  },
];

export { authProtectedRoutes, publicRoutes }