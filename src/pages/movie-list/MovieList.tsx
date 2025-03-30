import React, { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import {
	fetchMovieList,
	setSearchQuery,
	setPage,
	setType,
	setYear,
} from '../../store/slices/movies';
import useDebounce from '../../hooks/use-debounce';
import MovieSearchInputs from './components/MovieSearchInputs';
import MovieTable from './components/MovieTable';
import MovieTableSkeleton from './components/MovieTableSkeleton';

const MovieList = () => {
	const dispatch = useAppDispatch();
	const { movies, totalResults, searchQuery, page, type, year } = useAppSelector(
		(state) => state.movies
	);
	const loading = useAppSelector((state) => state.common.loading);

	const totalPages = Math.ceil(totalResults / 10);

	const debouncedQuery = useDebounce(searchQuery, 500);
	const debouncedType = useDebounce(type, 500);
	const debouncedYear = useDebounce(year, 500);

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
		dispatch(setPage(value));
	};

	const handleQueryChange = (newQuery: string) => {
		dispatch(setSearchQuery(newQuery));
	};

	const handleTypeChange = (newType: string) => {
		dispatch(setType(newType));
	};

	const handleYearChange = (newYear: string) => {
		dispatch(setYear(newYear));
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
					query={searchQuery}
					setQuery={handleQueryChange}
					year={year}
					setYear={handleYearChange}
					type={type}
					setType={handleTypeChange}
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
