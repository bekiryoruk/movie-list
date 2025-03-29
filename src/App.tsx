import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import { useAppDispatch, useAppSelector } from './store';
import { changeTest } from './store/slices';

function App() {
	const testValue = useAppSelector((state) => state.movies.test);
	const dispatch = useAppDispatch();

	const buttonHandler = () => {
		dispatch(changeTest('Test 1'));
	};

	return (
		<>
			<div>
				<a href='https://vite.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>{testValue}</h1>
			<div className='card'>
				<button onClick={buttonHandler}>count is {testValue}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</>
	);
}

export default App;
