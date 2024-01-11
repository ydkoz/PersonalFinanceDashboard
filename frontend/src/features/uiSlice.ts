import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
	activePage: string;
	theme: string;
}

const initialState: UIState = {
	activePage: 'dashboard',
	theme: 'light',
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setActivePage(state, action: PayloadAction<string>) {
			state.activePage = action.payload;
		},
		toggleTheme(state) {
			state.theme = state.theme === 'light' ? 'dark' : 'light';
		},
	},
});

export const { setActivePage, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
