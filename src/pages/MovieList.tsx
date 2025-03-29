import React, { useEffect, useState } from 'react';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	Select,
	MenuItem,
	Button,
	Typography,
	Pagination,
	Stack,
} from '@mui/material';
import { Movie } from '../types/movie';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchMovieList } from '../store/slices';

const MovieList = () => {
	const dispatch = useAppDispatch();
	const { movies, loading, error, totalResults } = useAppSelector((state) => state.movies);

	const [query, setQuery] = useState('Pokemon');
	const [page, setPage] = useState(1);
	const [type, setType] = useState('');
	const [year, setYear] = useState('');
	const totalPages = Math.ceil(totalResults / 10);

	useEffect(() => {
		dispatch(fetchMovieList({ query, page, type, year }));
	}, [dispatch, query, page, type, year]);

	const handleSearch = () => {
		setPage(1);
		dispatch(fetchMovieList({ query, page: 1, type, year }));
	};

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
		dispatch(fetchMovieList({ query, page: value, type, year }));
	};

	return (
		<Box p={4}>
			<Typography variant='h4' gutterBottom>
				🎬 Movie Explorer
			</Typography>

			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
				<TextField
					label='Search'
					variant='outlined'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<TextField
					label='Year'
					variant='outlined'
					value={year}
					onChange={(e) => setYear(e.target.value)}
				/>
				<Select
					value={type}
					onChange={(e) => setType(e.target.value)}
					displayEmpty
					variant='outlined'
				>
					<MenuItem value=''>All</MenuItem>
					<MenuItem value='movie'>Movie</MenuItem>
					<MenuItem value='series'>TV Series</MenuItem>
					<MenuItem value='episode'>Episode</MenuItem>
				</Select>
				<Button variant='contained' onClick={handleSearch}>
					Search
				</Button>
			</Stack>

			{loading && <Typography>Loading...</Typography>}
			{error && <Typography color='error'>{error}</Typography>}

			{!loading && movies.length > 0 ? (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<strong>Title</strong>
								</TableCell>
								<TableCell>
									<strong>Release Date</strong>
								</TableCell>
								<TableCell>
									<strong>IMDb ID</strong>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{movies.map((movie: Movie) => (
								<TableRow key={movie.imdbID}>
									<TableCell>{movie.Title}</TableCell>
									<TableCell>{movie.Year}</TableCell>
									<TableCell>{movie.imdbID}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				!loading && <Typography mt={3}>No results found.</Typography>
			)}

			{totalPages > 1 && (
				<Box mt={4} display='flex' justifyContent='center'>
					<Pagination count={totalPages} page={page} onChange={handlePageChange} color='primary' />
				</Box>
			)}
		</Box>
	);
};

export default MovieList;
