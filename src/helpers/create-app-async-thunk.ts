import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

interface ThunkConfig<T = unknown> {
	dispatch: AppDispatch;
	state: RootState;
	rejectValue: T;
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkConfig>();
