import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieDetails } from '../../api';
import { Movie, MovieDetails } from '../../types/movie';
import { setError, setLoading } from '.';

interface MovieState {
	movies: Movie[];
	totalResults: number;
	movieDetails: MovieDetails | null;
}

const initialState: MovieState = {
	movies: [],
	totalResults: 0,
	movieDetails: null,
};

// TODO: reject errors with 	thunkAPI.rejectWithValue(message);
export const fetchMovieList = createAsyncThunk(
	'movies/fetchMovieList',
	async (
		{
			query,
			page,
			type,
			year,
		}: {
			query: string;
			page: number;
			type: string;
			year: string;
		},
		{ dispatch }
	) => {
		try {
			dispatch(setLoading(true));
			dispatch(setError(null));
			const { movies, totalResults } = await fetchMovies(query, page, type, year);
			return { movies, totalResults };
		} catch (err: unknown) {
			if (err instanceof Error) {
				dispatch(setError(err.message || 'Something went wrong.'));
			} else {
				dispatch(setError('An unknown error occurred.'));
			}
			throw err;
		} finally {
			dispatch(setLoading(false));
		}
	}
);

export const fetchMovieDetail = createAsyncThunk(
	'movies/fetchMovieDetail',
	async (id: string, { dispatch }) => {
		try {
			dispatch(setLoading(true));
			dispatch(setError(null));
			const data = await fetchMovieDetails(id);
			return data;
		} catch (err: unknown) {
			if (err instanceof Error) {
				dispatch(setError(err.message || 'Something went wrong.'));
			} else {
				dispatch(setError('An unknown error occurred.'));
			}
			throw err;
		} finally {
			dispatch(setLoading(false));
		}
	}
);

const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		clearMovieDetails(state) {
			state.movieDetails = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMovieList.fulfilled, (state, action) => {
			state.movies = action.payload.movies;
			state.totalResults = action.payload.totalResults;
		});

		builder.addCase(
			fetchMovieDetail.fulfilled,
			(state, action: PayloadAction<MovieDetails | null>) => {
				state.movieDetails = action.payload;
			}
		);
	},
});

export const { clearMovieDetails } = movieSlice.actions;
export default movieSlice.reducer;
