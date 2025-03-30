import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchMovieList } from '../../store/slices';
import useDebounce from '../../hooks/use-debounce';
import MovieSearchInputs from './components/MovieSearchInputs';
import MovieTable from './components/MovieTable';
import MovieTableSkeleton from './components/MovieTableSkeleton';

const MovieList = () => {
	const dispatch = useAppDispatch();
	const { movies, totalResults } = useAppSelector((state) => state.movies);
	const loading = useAppSelector((state) => state.common.loading);

	const [query, setQuery] = useState('Pokemon');
	const [page, setPage] = useState(1);
	const [type, setType] = useState('');
	const [year, setYear] = useState('');
	const totalPages = Math.ceil(totalResults / 10);

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
		<Box
			sx={{
				minHeight: '100vh',
				pt: 5,
				pb: 5,
				boxSizing: 'border-box',
			}}
		>
			<Container maxWidth='lg'>
				<Typography
					variant='h3'
					gutterBottom
					textAlign='center'
					sx={{ fontWeight: 'bold', mb: 3, color: 'black' }}
				>
					ShowSeeker
				</Typography>

				<MovieSearchInputs
					query={query}
					setQuery={setQuery}
					year={year}
					setYear={setYear}
					type={type}
					setType={setType}
				/>

				{loading ? (
					<MovieTableSkeleton />
				) : (
					<MovieTable
						movies={movies}
						totalPages={totalPages}
						page={page}
						handlePageChange={handlePageChange}
					/>
				)}
			</Container>
		</Box>
	);
};

export default MovieList;
