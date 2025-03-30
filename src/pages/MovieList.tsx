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
	Typography,
	Pagination,
	Stack,
	Alert,
} from '@mui/material';
import { Movie } from '../types/movie';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchMovieList } from '../store/slices';
import useDebounce from '../hooks/useDebounce';
import { Link } from 'react-router-dom';

const MovieList = () => {
	const dispatch = useAppDispatch();
	const { movies, totalResults } = useAppSelector((state) => state.movies);
	const { loading, error } = useAppSelector((state) => state.common);

	const [query, setQuery] = useState('Pokemon');
	const [page, setPage] = useState(1);
	const [type, setType] = useState('');
	const [year, setYear] = useState('');
	const totalPages = Math.ceil(totalResults / 10);

	// TODO: find a better way to add debounce
	const debouncedQuery = useDebounce(query, 500);
	const debouncedType = useDebounce(type, 500);
	const debouncedYear = useDebounce(year, 500);

	useEffect(() => {
		setPage(1);
	}, [debouncedQuery, debouncedType, debouncedYear]);

	useEffect(() => {
		dispatch(
			fetchMovieList({
				query: debouncedQuery,
				page,
				type: debouncedType,
				year: debouncedYear,
			})
		);
	}, [dispatch, debouncedQuery, page, debouncedType, debouncedYear]);

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<Box p={4}>
			<Typography variant='h4' gutterBottom textAlign='center'>
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
			</Stack>

			{error && (
				<Alert severity='error' sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			{!loading && movies.length > 0 ? (
				<>
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
										<TableCell>
											<Link
												to={`/${movie.imdbID}`}
												style={{ textDecoration: 'none', color: 'inherit' }}
											>
												{movie.Title}
											</Link>
										</TableCell>
										<TableCell>{movie.Year}</TableCell>
										<TableCell>{movie.imdbID}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					{totalPages > 1 && (
						<Box mt={4} display='flex' justifyContent='center'>
							<Pagination
								count={totalPages}
								page={page}
								onChange={handlePageChange}
								color='primary'
							/>
						</Box>
					)}
				</>
			) : (
				!loading && <Typography mt={3}>No results found.</Typography>
			)}
		</Box>
	);
};

export default MovieList;
