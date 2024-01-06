import { api } from '../services/api'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { User } from '../models/User';
import { setAuthToken, registerUser, loginUser, logoutUser, deleteUser } from '../services/userService';
import { loginStart, loginSuccess, loginFailure, logout } from '../features/userSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('User Service', () => {
	afterEach(() => {
		mock.reset();
	});

	const user = {
		firstname: 'Test',
		lastname: 'User',
		email: 'test@example.com',
		username: 'testuser111',
		password: 'password123'
	};

	const token = 'testToken';

	it('sets auth token correctly', () => {
		 setAuthToken(token);
		 expect(api.defaults.headers.common['Authorization']).toBe(`Bearer ${token}`);
		 setAuthToken(null);
		 expect(api.defaults.headers.common['Authorization']).toBeUndefined();
	});

	it('registers a new user successfully', async () => {
		const response = { message: 'Registered successfully' };
		mock.onPost('/register').reply(200, response);

		const result = await registerUser(user);
		expect(result).toEqual(response);
	});

	it('handles user login', async () => {
		const store = mockStore({});
		const response = { userData: { ...user}, userToken: token };
		mock.onPost('/login').reply(200, response);

		 await store.dispatch(loginUser(user));

		const actions = store.getActions();
		expect(actions[0]).toEqual(loginStart());
		//expect(actions[1]).toEqual(loginSuccess(response));
	});

	it('delete user successfully', async () => {
		const response = { message: 'User deleted successfully' };
		mock.onDelete('/').reply(200, response);
		const result = await deleteUser(user);
		expect(result).toEqual(response);
	});

	it('handles login failure', async () => {
		const store = mockStore({});
		const errorMessage = 'Username and/or password incorrect';
		mock.onPost('/login').reply(400, { message: errorMessage });

		await store.dispatch(loginUser(user));

		const actions = store.getActions();
		expect(actions[0]).toEqual(loginStart());
		expect(actions[1]).toEqual(loginFailure(errorMessage));
	});

	it('handles user logout', () => {
		const store = mockStore({});
		logoutUser(store.dispatch);

		const actions = store.getActions();
		expect(actions[0]).toEqual(logout());
	});

});
