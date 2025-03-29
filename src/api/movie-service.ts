import { Movie, MovieApiResponse } from '../types/movie';
import { api } from './api';

export const fetchMovies = async (
	query: string,
	page: number = 1,
	type: string = '',
	year: string = ''
): Promise<{ movies: Movie[]; totalResults: number }> => {
	try {
		const response = await api.get<MovieApiResponse>('', {
			params: {
				s: query || 'Pokemon',
				type: type,
				y: year,
				page: page,
			},
		});

		if (response.data.Response === 'True') {
			return {
				movies: response.data.Search || [],
				totalResults: parseInt(response.data.totalResults, 10),
			};
		} else {
			throw new Error(response.data.Error || 'Error fetching movies.');
		}
	} catch (error) {
		console.error('Error fetching movies:', error);
		return { movies: [], totalResults: 0 };
	}
};
