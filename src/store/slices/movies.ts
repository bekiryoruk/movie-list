import { fetchMovies, fetchMovieDetails } from '../../api';
import { Movie, MovieDetails } from '../../types/movie';
import { setError, setLoading } from '.';
import { handleThunkError } from '../../helpers/handle-thunk-error';
import { createAppAsyncThunk } from '../../helpers/create-app-async-thunk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const fetchMovieList = createAppAsyncThunk(
	'movies/fetchMovieList',
	async (
		{ query, page, type, year }: { query: string; page: number; type: string; year: string },
		{ dispatch, rejectWithValue }
	) => {
		try {
			dispatch(setLoading(true));
			dispatch(setError(null));
			const { movies, totalResults } = await fetchMovies(query, page, type, year);
			return { movies, totalResults };
		} catch (err: unknown) {
			return handleThunkError(err, rejectWithValue, dispatch);
		} finally {
			dispatch(setLoading(false));
		}
	}
);

export const fetchMovieDetail = createAppAsyncThunk(
	'movies/fetchMovieDetail',
	async (id: string, { dispatch, rejectWithValue }) => {
		try {
			dispatch(setLoading(true));
			dispatch(setError(null));
			const data = await fetchMovieDetails(id);
			return data;
		} catch (err: unknown) {
			return handleThunkError(err, rejectWithValue, dispatch);
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
		builder.addCase(fetchMovieList.rejected, (state) => {
			state.movies = [];
			state.totalResults = 0;
		});

		builder.addCase(
			fetchMovieDetail.fulfilled,
			(state, action: PayloadAction<MovieDetails | null>) => {
				state.movieDetails = action.payload;
			}
		);
		builder.addCase(fetchMovieDetail.rejected, (state) => {
			state.movieDetails = null;
		});
	},
});

export const { clearMovieDetails } = movieSlice.actions;
export default movieSlice.reducer;
