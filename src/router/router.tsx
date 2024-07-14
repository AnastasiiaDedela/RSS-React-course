import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import NotFound from '../pages/NotFound/index';
import CardDetails from '../components/CardDetails';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/search/1" replace />,
  },
  {
    path: '/search/:page',
    element: <MainLayout />,
    children: [
      {
        path: 'details/:id',
        element: <CardDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
