import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	Box,
	Typography,
	CircularProgress,
	Card,
	CardContent,
	CardMedia,
	Button,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { clearMovieDetails, fetchMovieDetail } from '../store/slices';

const Movie = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const dispatch = useAppDispatch();
	const { movieDetails } = useAppSelector((state) => state.movies);
	const { loading, error } = useAppSelector((state) => state.common);

	useEffect(() => {
		if (movieId) {
			dispatch(fetchMovieDetail(movieId));
		}

		return () => {
			dispatch(clearMovieDetails());
		};
	}, [dispatch, movieId]);

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <Typography color='error'>{error}</Typography>;
	}

	if (!movieDetails) {
		return <Typography>No details found.</Typography>;
	}

	return (
		<Box p={4} display='flex' justifyContent='center'>
			<Card sx={{ maxWidth: 600 }}>
				<CardMedia
					component='img'
					height='400'
					image={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : '/no-image.png'}
					alt={movieDetails.Title}
				/>
				<CardContent>
					<Typography variant='h5' gutterBottom>
						{movieDetails.Title}
					</Typography>
					<Typography variant='body1'>🕒 {movieDetails.Runtime}</Typography>
					<Typography variant='body1'>🎭 {movieDetails.Genre}</Typography>
					<Typography variant='body1'>🎬 Director: {movieDetails.Director}</Typography>
					<Typography variant='body1'>⭐️ IMDb Rating: {movieDetails.imdbRating}</Typography>
					<Typography variant='body1'>Actors: {movieDetails.Actors}</Typography>
					<Typography variant='body2' mt={2}>
						{movieDetails.Plot}
					</Typography>
					<Button href={movieDetails.Website} target='_blank' variant='contained' sx={{ mt: 2 }}>
						Visit Official Website
					</Button>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Movie;
