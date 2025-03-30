import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorNotification from './components/ErrorNotification';
import LoadingSpinner from './components/LoadingSpinner';

const MovieList = lazy(() => import('./pages/MovieList'));
const Movie = lazy(() => import('./pages/Movie'));

function App() {
	return (
		<>
			<LoadingOverlay />
			<ErrorNotification />
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
