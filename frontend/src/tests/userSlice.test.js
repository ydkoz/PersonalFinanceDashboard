import {
	loginStart,
	loginSuccess,
	loginFailure,
	logout
} from '../features/userSlice';

describe('User Slice', () => {
	it('should create an action to start login', () => {
	  const expectedAction = {
		type: loginStart.type,
	  };
	  expect(loginStart()).toEqual(expectedAction);
	});
  
	it('should create an action for successful login', () => {
	  const userToken = 'mockUserToken';
	  const userData = { username: 'testuser' };
  
	  const expectedAction = {
		type: loginSuccess.type,
		payload: { userToken, userData },
	  };
  
	  expect(loginSuccess({ userToken, userData })).toEqual(expectedAction);
	});
  
	it('should create an action for login failure', () => {
	  const errorMessage = 'Login failed';
  
	  const expectedAction = {
		type: loginFailure.type,
		payload: errorMessage,
	  };
  
	  expect(loginFailure(errorMessage)).toEqual(expectedAction);
	});
  
	it('should create an action for logout', () => {
	  const expectedAction = {
		type: logout.type,
	  };
	  expect(logout()).toEqual(expectedAction);
	});
});