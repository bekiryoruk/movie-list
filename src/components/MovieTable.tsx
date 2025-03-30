import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	Pagination,
	Typography,
} from '@mui/material';
import { Movie } from '../types/movie';
import { Link } from 'react-router-dom';

interface MovieTableProps {
	movies: Movie[];
	totalPages: number;
	page: number;
	handlePageChange: (_: React.ChangeEvent<unknown>, value: number) => void;
}

const MovieTable: React.FC<MovieTableProps> = ({ movies, totalPages, page, handlePageChange }) => {
	return (
		<>
			{movies.length > 0 ? (
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
				<Typography mt={3}>No results found.</Typography>
			)}
		</>
	);
};

export default MovieTable;
