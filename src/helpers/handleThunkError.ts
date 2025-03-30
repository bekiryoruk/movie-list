/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { setError } from '../store/slices/common';
import { AppDispatch } from '../store';

export const handleThunkError = <T>(
	err: unknown,
	rejectWithValue: (value: T) => any,
	dispatch: AppDispatch
) => {
	if (err instanceof AxiosError) {
		dispatch(setError(err.response?.data?.error || err.message || 'Something went wrong.'));
		return rejectWithValue({
			error: err.response?.data?.error || err.message || 'Something went wrong.',
		} as T);
	}
	if (err instanceof Error) {
		dispatch(setError(err.message || 'Something went wrong.'));
		return rejectWithValue({
			error: err.message || 'Something went wrong.',
		} as T);
	}
	dispatch(setError('An unknown error occurred.'));
	return rejectWithValue({
		error: 'An unknown error occurred.',
	} as T);
};
