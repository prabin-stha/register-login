import { useAuth } from './useAuth';

const useLocalStorage = () => {
	const { setToken } = useAuth();

	const addTokenToLocalStorage = (token: string) => {
		localStorage.setItem('token', token);
	};

	const removeTokenFromLocalStorage = () => {
		localStorage.clear();
		setToken('');
	};

	const getTokenFromLocalStorage = () => {
		return localStorage.getItem('token') || '';
	};

	return {
		addTokenToLocalStorage,
		removeTokenFromLocalStorage,
		getTokenFromLocalStorage,
	};
};

export { useLocalStorage };
