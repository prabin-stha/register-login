import { Outlet } from 'react-router-dom';
import { useAuth, useLocalStorage } from '../../hooks';

import { Header } from '../Header/Header';

const Layout = () => {
	const { token } = useAuth();
	const { removeTokenFromLocalStorage } = useLocalStorage();
	return (
		<>
			{token && (
				<Header
					show='Log Out'
					onButtonClick={removeTokenFromLocalStorage}
				/>
			)}
			<main className='App'>
				<Outlet />
			</main>
		</>
	);
};

export { Layout };
