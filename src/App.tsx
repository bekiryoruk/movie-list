import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorNotification from './components/ErrorNotification';
import LoadingSpinner from './components/LoadingSpinner';

const MovieList = lazy(() => import('./pages/movie-list/MovieList'));
const Movie = lazy(() => import('./pages/movie/Movie'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
	return (
		<>
			<ErrorNotification />
			<Suspense fallback={<LoadingSpinner />}>
				<Routes>
					<Route path='/' element={<MovieList />} />
					<Route path=':movieId' element={<Movie />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
