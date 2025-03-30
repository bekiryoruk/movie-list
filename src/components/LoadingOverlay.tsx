import { useAppSelector } from '../store';
import LoadingSpinner from './LoadingSpinner';

const LoadingOverlay = () => {
	const loading = useAppSelector((state) => state.common.loading);

	if (!loading) return null;

	return <LoadingSpinner />;
};

export default LoadingOverlay;
