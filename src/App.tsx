import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LinearProgress, Box } from '@mui/material';
import { useAppSelector } from './store';

const MovieList = lazy(() => import('./pages/MovieList'));
const Movie = lazy(() => import('./pages/Movie'));

function App() {
	const loading = useAppSelector((state) => state.common.loading);

	return (
		<>
			{loading && <LinearProgress color='primary' />}

			<Suspense
				fallback={
					<Box p={4}>
						<LinearProgress />
					</Box>
				}
			>
				<Routes>
					<Route path='/' element={<MovieList />} />
					<Route path=':movieId' element={<Movie />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
