export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  tagline: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; logo_path: string | null; name: string }[];
  vote_average: number;
  genre_ids?: number[];
  budget?: number;
  revenue?: number;
  status?: string;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

