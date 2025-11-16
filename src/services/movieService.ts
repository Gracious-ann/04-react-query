import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieHttpResponse {
  results: Movie[];
  total_pages: number;
}

const fetchMovies = async (
  movie: string,
  page: number
): Promise<MovieHttpResponse> => {
  const response = await axios.get<MovieHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: movie,
        page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data;
};

export default fetchMovies;
