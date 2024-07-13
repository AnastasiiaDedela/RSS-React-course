import { PropsWithChildren } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

const PageParamWrapper = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = useSearchParams();
  const stateParam = search.get('page');
  console.log('stateParam: ', stateParam);

  return stateParam ? children : <Navigate to="/heroes?page=1" replace />;
};

export default PageParamWrapper;
