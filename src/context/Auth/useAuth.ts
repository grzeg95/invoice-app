import {useContext} from 'react';
import {AuthContext} from './AuthContext';

export function useAuth() {

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return authContext;
}
