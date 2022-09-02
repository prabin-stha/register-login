import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Location, useLocation, useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import { Header } from '../../components';
import { Endpoints } from '../../enums';
import { useAuth, useLocalStorage } from '../../hooks';

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setToken } = useAuth();

	const { addTokenToLocalStorage } = useLocalStorage();

	interface CustomizedState {
		from: Location;
	}
	const state = location.state as CustomizedState;
	const { pathname } = state.from || '/';

	const usernameOrEmailRef = useRef<HTMLInputElement>(null);

	const [usernameOrEmail, setUsernameOrEmail] = useState('');

	const [pwd, setPwd] = useState('');

	const [errorMsg, setErrorMsg] = useState('');

	const clickHandler = () => {
		navigate('/register');
	};

	useEffect(() => {
		usernameOrEmailRef.current?.focus();
	}, []);

	useEffect(() => {
		setErrorMsg('');
	}, [usernameOrEmail, pwd]);

	const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!usernameOrEmail && !pwd) {
			setErrorMsg('Invalid Form Submission');
			return;
		}

		try {
			// const response = await axios.post(
			// 	Endpoints.LOGIN,
			// 	JSON.stringify({ usernameOrEmail, password: pwd }),
			// 	{
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 			withCredentials: true,
			// 		},
			// 	}
			// );

			// setUsernameOrEmail('');
			// setPwd('');
			// setErrorMsg('');

			// setToken(response.data.jwt);
			// addTokenToLocalStorage(response.data.jwt);
			setToken('token');
			addTokenToLocalStorage('token');

			navigate(pathname, {
				replace: true,
			});
		} catch (err: any) {
			if (!err?.response) {
				setErrorMsg('No Server Response');
			} else if (err.response?.data?.statusCode === 400) {
				const errMsg = err.response?.data?.message;
				setErrorMsg(errMsg.charAt(0).toUpperCase() + errMsg.slice(1));
			} else {
				setErrorMsg('Login Failed!');
			}
		}
	};

	return (
		<>
			<Header show='Sign Up' onButtonClick={clickHandler} />
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto'>
					<div className='mx-auto lg:w-2/5 xl: 2/6 md:w-2/3 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
						<h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
							Sign In
						</h2>
						<p
							className={
								errorMsg ? 'text-red-400 pb-2' : 'hidden'
							}
						>
							<FontAwesomeIcon icon={faCircleExclamation} />
							&nbsp;&nbsp;
							{errorMsg}
						</p>
						<form onSubmit={formSubmitHandler}>
							<div className='relative mb-4'>
								<label
									htmlFor='usernameEmail'
									className='leading-7 text-sm text-gray-600'
								>
									Username or Email
								</label>
								<input
									type='text'
									id='usernameEmail'
									autoComplete='off'
									onChange={e => {
										setUsernameOrEmail(e.target.value);
									}}
									required
									value={usernameOrEmail}
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>

							<div className='relative mb-4'>
								<label
									htmlFor='pwd'
									className='leading-7 text-sm text-gray-600'
								>
									Password
								</label>
								<input
									type='password'
									id='pwd'
									onChange={e => {
										setPwd(e.target.value);
									}}
									required
									value={pwd}
									className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
								/>
							</div>

							<button
								type='submit'
								disabled={!usernameOrEmail || !pwd}
								className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:bg-slate-400'
							>
								Login
							</button>
						</form>
						<p className='text-base text-gray-500 mt-3'>
							Don't have an account yet?&nbsp;&nbsp;
							<Link to='/register'>
								<span className='font-semibold cursor-pointer'>
									Sign Up
								</span>
							</Link>
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export { Login };
