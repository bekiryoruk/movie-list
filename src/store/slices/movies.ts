import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
	test: string;
} = {
	test: 'test',
};

const moviesSlice = createSlice({
	name: 'movies',
	initialState: initialState,
	reducers: {
		changeTest(state, action: PayloadAction<string>) {
			state.test = action.payload;
		},
	},
});

const { reducer } = moviesSlice;

export const { changeTest } = moviesSlice.actions;

export default reducer;
