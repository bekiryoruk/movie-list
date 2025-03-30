import { Box, Typography, Card, Skeleton, CardContent } from '@mui/material';

const MovieSkeleton = ({ noDetails }: { noDetails: boolean }) => (
	<Box
		p={4}
		display='flex'
		flexDirection='column'
		justifyContent='center'
		alignItems='center'
		minHeight='100vh'
		gap={4}
		boxSizing='border-box'
	>
		{noDetails && (
			<Typography variant='h6' textAlign='center' mt={4} color='text.secondary'>
				No details found.
			</Typography>
		)}
		<Card
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				maxWidth: 900,
				boxShadow: 5,
				borderRadius: 3,
				backgroundColor: '#fff',
			}}
		>
			<Skeleton variant='rectangular' width={400} height={500} />
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					width: '100%',
					padding: 2,
				}}
			>
				<Skeleton variant='text' height={40} width='80%' />
				<Skeleton variant='text' height={20} width='60%' />
				<Skeleton variant='text' height={20} width='70%' />
				<Skeleton variant='rectangular' height={100} width='100%' sx={{ mt: 2 }} />
			</CardContent>
		</Card>
	</Box>
);

export default MovieSkeleton;
