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
	searchQuery: string;
	page: number;
	type: string;
	year: string;
}

const initialState: MovieState = {
	movies: [],
	totalResults: 0,
	movieDetails: null,
	searchQuery: 'Pokemon',
	page: 1,
	type: '',
	year: '',
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
		setSearchQuery(state, action: PayloadAction<string>) {
			state.searchQuery = action.payload;
			state.page = 1;
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
		setType(state, action: PayloadAction<string>) {
			state.type = action.payload;
			state.page = 1;
		},
		setYear(state, action: PayloadAction<string>) {
			state.year = action.payload;
			state.page = 1;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMovieList.fulfilled, (state, action) => {
			state.movies = action.payload.movies;
			state.totalResults = action.payload.totalResults;
			state.searchQuery = action.meta.arg.query;
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

export const { clearMovieDetails, setSearchQuery, setPage, setType, setYear } = movieSlice.actions;
export default movieSlice.reducer;
