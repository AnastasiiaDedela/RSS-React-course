import { Navigate, createBrowserRouter, redirect } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import NotFound from '../pages/NotFound/NotFound.module';
import PageParamWrapper from '../components/PageParamWrapper';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/heroes?page=1" replace />,
  },
  {
    path: '/heroes',

    element: (
      <PageParamWrapper>
        <MainLayout />
      </PageParamWrapper>
    ),
    errorElement: <NotFound />,
  },
]);
