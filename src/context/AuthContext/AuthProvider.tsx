import { useState } from 'react';
import { AuthContext } from '.';

const AuthProvider = ({ children }: { children: JSX.Element }) => {
	const [authToken, setAuthToken] = useState('');

	const authContextValue = {
		token: authToken,
		setToken: setAuthToken,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };
