import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleThunkError = <T>(err: unknown, rejectWithValue: (value: T) => any) => {
	if (err instanceof AxiosError) {
		return rejectWithValue({
			error: err.response?.data?.error || err.message || 'Something went wrong.',
		} as T);
	}
	if (err instanceof Error) {
		return rejectWithValue({
			error: err.message || 'Something went wrong.',
		} as T);
	}
	return rejectWithValue({
		error: 'An unknown error occurred.',
	} as T);
};
