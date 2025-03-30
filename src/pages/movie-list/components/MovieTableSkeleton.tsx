import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Skeleton,
	Box,
} from '@mui/material';

const MovieTableSkeleton: React.FC = () => {
	return (
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
						{[...Array(5)].map((_, index) => (
							<TableRow key={index}>
								<TableCell>
									<Skeleton variant='text' width='60%' />
								</TableCell>
								<TableCell>
									<Skeleton variant='text' width='40%' />
								</TableCell>
								<TableCell>
									<Skeleton variant='text' width='50%' />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Box mt={4} display='flex' justifyContent='center'>
				<Skeleton variant='rectangular' width={200} height={40} />
			</Box>
		</>
	);
};
export default MovieTableSkeleton;
