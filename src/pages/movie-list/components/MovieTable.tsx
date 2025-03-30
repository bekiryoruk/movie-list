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
} from '@mui/material';
import { Movie } from '../../../types/movie';
import { useNavigate } from 'react-router-dom';

interface MovieTableProps {
	movies: Movie[];
	totalPages: number;
	page: number;
	handlePageChange: (_: React.ChangeEvent<unknown>, value: number) => void;
}

const MovieTable: React.FC<MovieTableProps> = ({ movies, totalPages, page, handlePageChange }) => {
	const navigate = useNavigate();

	return (
		<>
			{movies.length > 0 && (
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
								{movies.map((movie: Movie, index: number) => (
									<TableRow
										key={movie.imdbID}
										style={{
											cursor: 'pointer',
											backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e0e0e0',
											color: '#000',
										}}
										onClick={() => navigate(`/${movie.imdbID}`)}
									>
										<TableCell>{movie.Title}</TableCell>
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
			)}
		</>
	);
};

export default MovieTable;
