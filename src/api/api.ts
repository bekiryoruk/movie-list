import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
	baseURL: BASE_URL,
	timeout: 30000,
	params: {
		apikey: API_KEY,
	},
});
