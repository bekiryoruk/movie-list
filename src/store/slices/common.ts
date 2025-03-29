import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
	loading: boolean;
	error: string | null;
	modalOpen: boolean;
	toastMessage: string | null;
}

const initialState: CommonState = {
	loading: false,
	error: null,
	modalOpen: false,
	toastMessage: null,
};

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload;
		},
		setModalOpen(state, action: PayloadAction<boolean>) {
			state.modalOpen = action.payload;
		},
		setToastMessage(state, action: PayloadAction<string | null>) {
			state.toastMessage = action.payload;
		},
	},
});

export const { setLoading, setError, setModalOpen, setToastMessage } = commonSlice.actions;

const { reducer } = commonSlice;

export default reducer;
