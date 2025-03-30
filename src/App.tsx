import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './store';
import LoadingSpinner from './components/LoadingSpinner';

const MovieList = lazy(() => import('./pages/MovieList'));
const Movie = lazy(() => import('./pages/Movie'));

function App() {
	const loading = useAppSelector((state) => state.common.loading);

	return (
		<>
			{loading && <LoadingSpinner />}
			<Suspense fallback={<LoadingSpinner />}>
				<Routes>
					<Route path='/' element={<MovieList />} />
					<Route path=':movieId' element={<Movie />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
