import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';

const Auth = () => {
	const { token } = useAuth();

	return !token ? <Outlet /> : <></>;
};

export { Auth };
