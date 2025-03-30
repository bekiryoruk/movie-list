import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearMovieDetails, fetchMovieDetail } from '../../store/slices';
import MovieDetail from './components/MovieDetail';
import MovieSkeleton from './components/MovieSkeleton';

const Movie = () => {
	const { movieId } = useParams<{ movieId: string }>();
	const dispatch = useAppDispatch();
	const { movieDetails } = useAppSelector((state) => state.movies);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (movieId) {
			dispatch(fetchMovieDetail(movieId)).finally(() => setLoading(false));
		}

		return () => {
			dispatch(clearMovieDetails());
			setLoading(true);
		};
	}, [dispatch, movieId]);

	if (loading || !movieDetails) {
		return <MovieSkeleton noDetails={!loading && !movieDetails} />;
	}

	return <MovieDetail movieDetails={movieDetails} />;
};

export default Movie;
