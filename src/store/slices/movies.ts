import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../../types/movie';
import { fetchMovies } from '../../api';

interface MovieState {
	movies: Movie[];
	totalResults: number;
	loading: boolean;
	error: string | null;
}

const initialState: MovieState = {
	movies: [],
	totalResults: 0,
	loading: false,
	error: null,
};

export const fetchMovieList = createAsyncThunk(
	'movies/fetchMovies',
	async ({
		query,
		page,
		type,
		year,
	}: {
		query: string;
		page: number;
		type: string;
		year: string;
	}) => {
		const { movies, totalResults } = await fetchMovies(query, page, type, year);
		return { movies, totalResults };
	}
);

const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovieList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchMovieList.fulfilled, (state, action) => {
				state.loading = false;
				state.movies = action.payload.movies || [];
				state.totalResults = action.payload.totalResults || 0;
			})
			.addCase(fetchMovieList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Error fetching movies.';
			});
	},
});
const { reducer } = movieSlice;

export default reducer;
