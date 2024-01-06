import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';

interface AuthState {
	isLoggedIn: boolean;
	userToken : string | null;
	userData: User | null;
	authLoading: boolean;
	authError: string | null;
}

const initialState: AuthState = {
	isLoggedIn: false,
	userToken : null,
	userData: null,
	authLoading: false,
	authError: null
};

const authSlice= createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart(state) {
			state.authLoading = true;
		},
		loginSuccess(state, action: PayloadAction< { userToken: string, userData: User}>) {
			state.isLoggedIn=true;
			state.userToken=action.payload.userToken;
			state.userData=action.payload.userData;
			state.authLoading=false;
			state.authError=null;
		},
		loginFailure(state,action: PayloadAction<string>) {
			state.authLoading = false;
			state.authError = action.payload;
		},
		logout(state) {
			state.isLoggedIn=false;
			state.userToken=null;
			state.userData=null;
		}
	}
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout
} = authSlice.actions;
export default authSlice.reducer;