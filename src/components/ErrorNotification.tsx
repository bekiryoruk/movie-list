import { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { setError } from '../store/slices/common';

const ErrorNotification = () => {
	const error = useAppSelector((state) => state.common.error);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => {
				dispatch(setError(null));
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [error, dispatch]);

	return (
		<Snackbar
			open={!!error}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={() => dispatch(setError(null))}
		>
			<Alert severity='error' variant='filled'>
				{error}
			</Alert>
		</Snackbar>
	);
};

export default ErrorNotification;
