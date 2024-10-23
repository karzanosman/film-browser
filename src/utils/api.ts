import axios from 'axios';
import { Movie, MovieListResponse } from '@/types/movie.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export async function getMoviesByGenre(
  genreId: number,
  page: number = 1
): Promise<MovieListResponse> {
  try {
    const response = await api.get<MovieListResponse>('/discover/movie', {
      params: {
        with_genres: genreId,
        page: page,
        sort_by: 'popularity.desc',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
}

export async function getMovieById(movieId: number): Promise<Movie> {
  try {
    const response = await api.get<Movie>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}
