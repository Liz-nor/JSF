import { createContext } from 'react';

export interface User {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
