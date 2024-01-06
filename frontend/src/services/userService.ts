import { api } from './api';
import { Dispatch } from 'redux';
import { loginStart,loginSuccess,loginFailure,logout } from '../features/userSlice';
import { User } from '../models/User'

const setAuthToken = (jwtToken: String | null) => {
	if(jwtToken) {
		api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
		api.defaults.headers.common['Content-Type'] = 'application/json';
	} else {
		delete api.defaults.headers.common['Authorization'];
	}
};

const deleteUser = async (user: User) => {
	try {
		const config = {
			data: {
				username: user.username
			}
		}
		const response = await api.delete('/users/', config);
		return response.data;
	} catch(error: any) {
		throw error;
	}
}

const registerUser = (userData: User) => async (dispatch: Dispatch) => {
	try {
		const response = await api.post('/users/register', userData);
		return response.data;
	} catch(error: any) {
		throw error;
	}
}

const loginUser = (userData: User) => async (dispatch: Dispatch) => {
	try {
		dispatch(loginStart())
		const response = await api.post('/users/login', userData);
		const responseUserToken = response.data.user.token;
		const responseUserData = {
			firstname:response.data.user.firstname,
			lastname:response.data.user.lastname,
			email:response.data.user.email,
			username:response.data.user.username,
		}

		setAuthToken(responseUserToken);
		dispatch(loginSuccess({userToken: responseUserToken, userData: responseUserData}));
	} catch(error: any) {
		dispatch(loginFailure(error.response.data.message));
	}
};

const logoutUser = (dispatch: Dispatch) => {
	try {
		setAuthToken(null);
		dispatch(logout());
	} catch(error: any) {
		throw error.response.data;
	}
}

export {
	setAuthToken,
	registerUser,
	loginUser,
	logoutUser,
	deleteUser
}