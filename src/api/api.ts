import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=' + API_KEY;

export const api = axios.create({
	baseURL: BASE_URL,
	timeout: 30000,
});
