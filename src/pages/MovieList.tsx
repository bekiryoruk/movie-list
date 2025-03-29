import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { fetchMovieList } from '../store/slices';
import { Movie } from '../types/movie';

const MovieList = () => {
	const dispatch = useAppDispatch();
	const { movies, loading, error, totalResults } = useAppSelector(
		(state: RootState) => state.movies
	);

	const [query, setQuery] = useState<string>('Pokemon');
	const [page, setPage] = useState<number>(1);
	const [type, setType] = useState<string>('');
	const [year, setYear] = useState<string>('');
	const totalPages = Math.ceil(totalResults / 10);

	useEffect(() => {
		dispatch(fetchMovieList({ query, page, type, year }));
	}, [dispatch, query, page, type, year]);

	const handleSearch = () => {
		setPage(1);
		dispatch(fetchMovieList({ query, page: 1, type, year }));
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		dispatch(fetchMovieList({ query, page: newPage, type, year }));
	};

	return (
		<div className='container'>
			<h1>🎥 Movie Explorer</h1>

			<div className='search-bar'>
				<input
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder='Search movies...'
				/>
				<button onClick={handleSearch}>Search</button>
			</div>

			<div className='filters'>
				<input
					type='text'
					placeholder='Year'
					value={year}
					onChange={(e) => setYear(e.target.value)}
				/>
				<select value={type} onChange={(e) => setType(e.target.value)}>
					<option value=''>All</option>
					<option value='movie'>Movies</option>
					<option value='series'>TV Series</option>
					<option value='episode'>Episodes</option>
				</select>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}

			{!loading && movies.length > 0 ? (
				<table className='movie-table'>
					<thead>
						<tr>
							<th>Poster</th>
							<th>Name</th>
							<th>Release Date</th>
							<th>Type</th>
							<th>IMDb ID</th>
						</tr>
					</thead>
					<tbody>
						{movies.map((movie: Movie) => (
							<tr key={movie.imdbID}>
								<td>
									<img
										src={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
										alt={movie.Title}
										width='50'
									/>
								</td>
								<td>{movie.Title}</td>
								<td>{movie.Year}</td>
								<td>{movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}</td>
								<td>{movie.imdbID}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				!loading && <p>No movies found.</p>
			)}

			{totalPages > 1 && (
				<div className='pagination'>
					<button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
						Previous
					</button>
					<span>
						Page {page} of {totalPages}
					</span>
					<button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default MovieList;
