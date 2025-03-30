import { Container, Typography, Button } from '@mui/material';

function NotFound() {
	return (
		<Container maxWidth='sm' style={{ textAlign: 'center', marginTop: '100px', color: 'black' }}>
			<Typography variant='h1' color='error' gutterBottom>
				404
			</Typography>
			<Typography variant='h6' gutterBottom>
				Oops! The page you're looking for does not exist.
			</Typography>
			<Button variant='contained' color='primary' href='/' sx={{ marginTop: '20px' }}>
				Go back home
			</Button>
		</Container>
	);
}

export default NotFound;
