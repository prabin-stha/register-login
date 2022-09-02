import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import { Auth, Login, Register, RequireAuth } from './container';
import { useAuth, useLocalStorage } from './hooks';

import { CreateBlog, Homepage, NotFound } from './pages';

function App() {
	const { token, setToken } = useAuth();

	const { getTokenFromLocalStorage } = useLocalStorage();
	const localToken: string = getTokenFromLocalStorage();

	useEffect(() => {
		setToken(localToken);
	}, [localToken, setToken]);

	return (
		<Routes>
			<Route element={<Layout />}>
				<Route element={<Auth />}>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Route>

				{/* Protected Routes */}
				<Route element={<RequireAuth />}>
					<Route path='/home' element={<Homepage />} />
					<Route path='/create' element={<CreateBlog />} />
				</Route>

				<Route path='/' element={<Navigate to='/home' />} />
				<Route
					path='*'
					element={
						<NotFound buttonText={`${token ? 'Home' : 'Log In'}`} />
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
