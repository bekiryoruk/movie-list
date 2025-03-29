export interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: 'movie' | 'series' | 'episode';
	Poster: string;
}

export interface MovieApiResponse {
	Search: Movie[];
	totalResults: string;
	Response: 'True' | 'False';
	Error?: string;
}
