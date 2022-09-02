import { createContext } from 'react';

const AuthContext = createContext({
	token: '',
	setToken: (newToken: string) => {},
});

export { AuthContext };
