import { createContext } from 'react';

/** Estados possíveis de `status`: 'loading' | 'authenticated' | 'unauthenticated'. */
export const AuthContext = createContext(null);
