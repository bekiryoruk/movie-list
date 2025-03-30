import { Box, Card, CardMedia, CardContent, Typography, Stack, Chip, Button } from '@mui/material';
import { MovieDetails } from '../../../types/movie';

const MovieDetail = ({ movieDetails }: { movieDetails: MovieDetails }) => (
	<Box
		p={4}
		display='flex'
		justifyContent='center'
		alignItems='center'
		minHeight='100vh'
		boxSizing='border-box'
	>
		<Card
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				maxWidth: 900,
				boxShadow: 5,
				borderRadius: 3,
				backgroundColor: '#fff',
			}}
		>
			<CardMedia
				component='img'
				sx={{
					width: { xs: '100%', md: 400 },
					height: { xs: 400, md: 'auto' },
					objectFit: 'cover',
				}}
				image={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : '/no-image.png'}
				alt={movieDetails.Title}
			/>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				<Typography variant='h4' gutterBottom fontWeight='bold'>
					{movieDetails.Title}
				</Typography>

				<Stack direction='row' spacing={1} mb={2}>
					<Chip label={`🕒 ${movieDetails.Runtime}`} variant='outlined' />
					<Chip label={`🎭 ${movieDetails.Genre}`} variant='outlined' />
					<Chip label={`⭐️ IMDb: ${movieDetails.imdbRating}`} color='primary' variant='outlined' />
				</Stack>

				<Typography variant='body1' mt={1}>
					🎬 Director: <strong>{movieDetails.Director}</strong>
				</Typography>
				<Typography variant='body1'>
					🎥 Actors: <strong>{movieDetails.Actors}</strong>
				</Typography>

				<Typography variant='body2' mt={2} color='text.secondary'>
					{movieDetails.Plot}
				</Typography>

				{movieDetails.Website && movieDetails.Website !== 'N/A' && (
					<Button
						href={movieDetails.Website}
						target='_blank'
						variant='contained'
						color='primary'
						sx={{ mt: 3 }}
					>
						Visit Official Website
					</Button>
				)}
			</CardContent>
		</Card>
	</Box>
);

export default MovieDetail;
