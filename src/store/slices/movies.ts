import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from '../../api';
import { Movie } from '../../types/movie';
import { setLoading, setError } from './common';

interface MovieState {
	movies: Movie[];
	totalResults: number;
}

const initialState: MovieState = {
	movies: [],
	totalResults: 0,
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

const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchMovieList.fulfilled, (state, action) => {
			state.movies = action.payload.movies;
			state.totalResults = action.payload.totalResults;
		});
	},
});

export default movieSlice.reducer;
