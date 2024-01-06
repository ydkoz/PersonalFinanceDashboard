import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { registerUser } from '../services/userService';
import { User } from '../models/User'
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleInputChange =
	(setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError('');
        setter(e.target.value);
    };

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
		  const user: User = { firstname, lastname, email, username, password };
		  await dispatch(registerUser(user));
		  navigate('/login');
		} catch(error: any) {
			setError('Username and/or password incorrect');
		}
	};

	return (
		<div className="register-container">
			<form onSubmit={handleSubmit}>
				<h2>Personal Finance Dashboard</h2>
				<input
					type="text"
					placeholder="First Name"
					value={firstname}
					onChange={handleInputChange(setFirstname)}>
				</input>
				<input
					type="text"
					placeholder="Last Name"
					value={lastname}
					onChange={handleInputChange(setLastname)}>
				</input>
				<input
					type="text"
					placeholder="Email Address"
					value={email}
					onChange={handleInputChange(setEmail)}>
				</input>
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
				<button type="submit">Register</button>
			</form>
			<button type="button" onClick={() => navigate('/login')}>Back to Log in</button>
		</div>
	)
};

export default Register