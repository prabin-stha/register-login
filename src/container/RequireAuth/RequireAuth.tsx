import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

const RequireAuth = () => {
	const { token } = useAuth();
	const location = useLocation();

	return token ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace={true} />
	);
};

export { RequireAuth };
