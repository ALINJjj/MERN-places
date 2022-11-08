import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userID: "",
  token: null,
  login: () => {},
  logout: () => {}
});
