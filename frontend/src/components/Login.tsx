import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useAppSelector } from '../app/hooks';
import { loginUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { unwrapResult } from '@reduxjs/toolkit';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn);
	const [error, setError] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleInputChange =
	(setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
		if (error) setError('');
		else setter(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const result = await dispatch(loginUser({ username, password }));
			unwrapResult(result);
			navigate('/dashboard');
		} catch(error: any) {
			setError(error.response.data.message);
		}
	};

	return (
		<div className="login-container">
			<form onSubmit={handleSubmit}>
				<h2>Personal Finance Dashboard</h2>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={handleInputChange(setUsername)}>
				</input>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={handleInputChange(setPassword)}>
				</input>
				{error && <div id="error" className="error">{error}</div>}
				<button type="submit">Log in</button>
			</form>
			<button type="button" onClick={() => navigate('/register')}>Register</button>
		</div>
	)
};

export default Login