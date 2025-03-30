import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
	return (
		<Box
			position='fixed'
			top={0}
			left={0}
			width='100vw'
			height='100vh'
			display='flex'
			justifyContent='center'
			alignItems='center'
			bgcolor='rgba(255, 255, 255, 0.8)'
			zIndex={1300}
		>
			<CircularProgress color='primary' />
		</Box>
	);
};

export default LoadingSpinner;
