import React from 'react';

import { useAuth } from '../contexts/auth';
import AuthRoutes from './AuthRoutes';
import OtherRoutes from './OtherRoutes';

const Routes: React.FC = () => {
  const { signed } = useAuth()
  return signed ? <OtherRoutes /> : <AuthRoutes />
}

export default Routes
