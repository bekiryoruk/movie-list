import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const MovieList = lazy(() => import('./pages/MovieList'));
const Movie = lazy(() => import('./pages/Movie'));

function App() {
	// TODO: put a loading spinner

	return (
		<Routes>
			<Route path='/'>
				<Route index element={<MovieList />} />
				<Route path=':movieId' element={<Movie />} />
			</Route>
		</Routes>
	);
}

export default App;
