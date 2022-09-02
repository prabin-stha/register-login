import {
	faCheck,
	faExclamation,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from '../../api/axios';
import { Header } from '../../components';
import { EMAIL_REGEX, PASSWORD_REGEX, USER_REGEX } from '../../constants/regex';
import { Endpoints } from '../../enums';

const Register = () => {
	const navigate = useNavigate();

	const fullNameRef = useRef<HTMLInputElement>(null);
	const errorRef = useRef<HTMLParagraphElement>(null);

	const [fullName, setFullName] = useState('');
	const [validFullName, setValidFullName] = useState(false);
	const [fullNameFocus, setFullNameFocus] = useState(false);

	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatchPwd, setValidMatchPwd] = useState(false);
	const [matchPwdFocus, setMatchPwdFocus] = useState(false);

	const [errorMsg, setErrorMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		fullNameRef.current?.focus();
	}, []);

	useEffect(() => {
		setValidFullName(fullName.length >= 2);
	}, [fullName]);

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
	}, [username]);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPwd(PASSWORD_REGEX.test(pwd));

		setValidMatchPwd(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrorMsg('');
	}, [username, pwd, matchPwd, email, fullName]);

	const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!USER_REGEX.test(username) &&
			!PASSWORD_REGEX.test(pwd) &&
			!EMAIL_REGEX.test(email) &&
			pwd !== matchPwd &&
			!(fullName.length >= 2)
		) {
			setErrorMsg('Invalid Submission');
			return;
		}

		try {
			await axios.post(
				Endpoints.REGISTER,
				JSON.stringify({ fullName, email, username, password: pwd }),
				{
					headers: {
						'Content-Type': 'application/json',
						withCredentials: true,
					},
				}
			);
			setSuccess(true);
			setFullName('');
			setUsername('');
			setEmail('');
			setPwd('');
			setMatchPwd('');
			setErrorMsg('');
		} catch (err: any) {
			if (!err?.response) {
				setErrorMsg('No Server Response');
			} else if (err.response?.data?.statusCode === 400) {
				setValidEmail(false);
				setValidUsername(false);
				setErrorMsg('User with similar username or email exists!');
			} else {
				setErrorMsg('Registration Failed!');
			}
		}
	};

	const clickHandler = () => {
		navigate('../');
	};

	return (
		<>
			<Header show='Sign In' onButtonClick={clickHandler} />
			{success ? (
				<section className='text-gray-600 body-font'>
					<div className='container px-5 py-24 mx-auto'>
						<div className='mx-auto lg:w-2/5 xl: 2/6 md:w-2/3 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
							<h1 className='bg-green-400 text-white px-4 py-2 rounded-lg text-lg mb-3 text-center'>
								Account Creation Sucessfull!
							</h1>
							<Link to='/auth/login' replace>
								<span className='text-center cursor-pointer font-semibold text-lg'>
									Sign In
								</span>
							</Link>
						</div>
					</div>
				</section>
			) : (
				<section className='text-gray-600 body-font'>
					<div className='container px-5 py-24 mx-auto'>
						<div className='mx-auto lg:w-2/5 xl: 2/6 md:w-2/3 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
							<h2 className='text-gray-900 text-lg font-medium title-font mb-5'>
								Sign Up
							</h2>
							<p
								ref={errorRef}
								className={
									errorMsg ? 'text-red-400 pb-2' : 'hidden'
								}
							>
								{errorMsg}
							</p>
							<form onSubmit={formSubmitHandler}>
								<div className='relative mb-4'>
									<label
										htmlFor='fullName'
										className='leading-7 text-sm text-gray-600'
									>
										Full Name&nbsp;
										<FontAwesomeIcon
											icon={faCheck}
											className={
												validFullName
													? 'text-green-500'
													: 'hidden'
											}
										/>
										<FontAwesomeIcon
											icon={faExclamation}
											className={
												validFullName || !username
													? 'hidden'
													: 'text-red-500'
											}
										/>
									</label>
									<input
										type='text'
										id='fullName'
										autoComplete='off'
										ref={fullNameRef}
										onChange={e => {
											setFullName(e.target.value);
										}}
										required
										value={fullName}
										onFocus={() => setFullNameFocus(true)}
										onBlur={() => setFullNameFocus(false)}
										className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									/>
									<p
										className={
											fullNameFocus &&
											fullName &&
											!validFullName
												? 'mt-3'
												: 'hidden'
										}
									>
										<FontAwesomeIcon
											icon={faInfoCircle}
											className='text-indigo-400'
										/>
										&nbsp;&nbsp;Name field should be greater
										than 2 characters.
									</p>
								</div>

								<div className='relative mb-4'>
									<label
										htmlFor='username'
										className='leading-7 text-sm text-gray-600'
									>
										Username&nbsp;
										<FontAwesomeIcon
											icon={faCheck}
											className={
												validUsername
													? 'text-green-500'
													: 'hidden'
											}
										/>
										<FontAwesomeIcon
											icon={faExclamation}
											className={
												validUsername || !username
													? 'hidden'
													: 'text-red-500'
											}
										/>
									</label>
									<input
										type='text'
										id='username'
										autoComplete='off'
										onChange={e => {
											setUsername(e.target.value);
										}}
										required
										value={username}
										onFocus={() => setUserFocus(true)}
										onBlur={() => setUserFocus(false)}
										className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									/>
									<p
										className={
											userFocus &&
											username &&
											!validUsername
												? 'mt-3'
												: 'hidden'
										}
									>
										<FontAwesomeIcon
											icon={faInfoCircle}
											className='text-indigo-400'
										/>
										&nbsp;&nbsp;4 to 24 characters.
										<br />
										Must begin with a letter.
										<br />
										Letters, numbers, underscores, hyphens
										allowed.
									</p>
								</div>

								<div className='relative mb-4'>
									<label
										htmlFor='email'
										className='leading-7 text-sm text-gray-600'
									>
										Email&nbsp;
										<FontAwesomeIcon
											icon={faCheck}
											className={
												validEmail
													? 'text-green-500'
													: 'hidden'
											}
										/>
										<FontAwesomeIcon
											icon={faExclamation}
											className={
												validEmail || !email
													? 'hidden'
													: 'text-red-500'
											}
										/>
									</label>
									<input
										type='text'
										id='email'
										autoComplete='off'
										onChange={e => {
											setEmail(e.target.value);
										}}
										required
										value={email}
										onFocus={() => setEmailFocus(true)}
										onBlur={() => setEmailFocus(false)}
										className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									/>
									<p
										className={
											emailFocus && email && !validEmail
												? 'mt-3'
												: 'hidden'
										}
									>
										<FontAwesomeIcon
											icon={faInfoCircle}
											className='text-indigo-400'
										/>
										&nbsp;&nbsp;Should contain @ followed by
										a domain name
									</p>
								</div>

								<div className='relative mb-4'>
									<label
										htmlFor='pwd'
										className='leading-7 text-sm text-gray-600'
									>
										Password&nbsp;
										<FontAwesomeIcon
											icon={faCheck}
											className={
												validPwd
													? 'text-green-500'
													: 'hidden'
											}
										/>
										<FontAwesomeIcon
											icon={faExclamation}
											className={
												validPwd || !pwd
													? 'hidden'
													: 'text-red-500'
											}
										/>
									</label>
									<input
										type='password'
										id='pwd'
										onChange={e => {
											setPwd(e.target.value);
										}}
										required
										value={pwd}
										onFocus={() => setPwdFocus(true)}
										onBlur={() => setPwdFocus(false)}
										className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									/>
									<p
										className={
											pwdFocus && pwd && !validPwd
												? 'mt-3'
												: 'hidden'
										}
									>
										<FontAwesomeIcon
											icon={faInfoCircle}
											className='text-indigo-400'
										/>
										&nbsp;&nbsp;8 to 24 characters.
										<br />
										Must include uppercase and lowercase
										letters, a number and a special
										character.
										<br />
										Allowed special characters: !, @, #, $,
										%
									</p>
								</div>

								<div className='relative mb-4'>
									<label
										htmlFor='matchPwd'
										className='leading-7 text-sm text-gray-600'
									>
										Confirm Password&nbsp;
										<FontAwesomeIcon
											icon={faCheck}
											className={
												validMatchPwd && pwd
													? 'text-green-500'
													: 'hidden'
											}
										/>
										<FontAwesomeIcon
											icon={faExclamation}
											className={
												validMatchPwd || !matchPwd
													? 'hidden'
													: 'text-red-500'
											}
										/>
									</label>
									<input
										type='password'
										id='matchPwd'
										onChange={e => {
											setMatchPwd(e.target.value);
										}}
										required
										value={matchPwd}
										onFocus={() => setMatchPwdFocus(true)}
										onBlur={() => setMatchPwdFocus(false)}
										className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
									/>
									<p
										className={
											matchPwdFocus &&
											matchPwd &&
											!validMatchPwd
												? 'mt-3'
												: 'hidden'
										}
									>
										<FontAwesomeIcon
											icon={faInfoCircle}
											className='text-indigo-400'
										/>
										&nbsp;&nbsp;Must match the first
										password input field.
									</p>
								</div>

								<button
									type='submit'
									disabled={
										!validUsername ||
										!validPwd ||
										!validMatchPwd ||
										!validFullName ||
										!validEmail
											? true
											: false
									}
									className='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:bg-slate-400'
								>
									Sign Up
								</button>
							</form>
							<p className='text-base text-gray-500 mt-3'>
								Already Have an Account?&nbsp;&nbsp;
								<Link to='../'>
									<span className='font-semibold cursor-pointer'>
										Sign In
									</span>
								</Link>
							</p>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export { Register };
