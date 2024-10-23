import Carousel from "@/components/Carousel";
import Loading from "@/components/Loading";
import "@/styles/HomePage.scss";
import { Movie } from "@/types/movie.types";
import { getMoviesByGenre } from "@/utils/api";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const ACTION_GENRE_ID = 28;
  const COMEDY_GENRE_ID = 35;
  const DRAMA_GENRE_ID = 18;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [actionResponse, comedyResponse, dramaResponse] =
          await Promise.all([
            getMoviesByGenre(ACTION_GENRE_ID),
            getMoviesByGenre(COMEDY_GENRE_ID),
            getMoviesByGenre(DRAMA_GENRE_ID),
          ]);

        setActionMovies(actionResponse.results);
        setComedyMovies(comedyResponse.results);
        setDramaMovies(dramaResponse.results);
      } catch (error) {
        setError("An error occurred while fetching movies.");
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <main>
        <Carousel films={actionMovies} title="Action Movies" />
        <Carousel films={comedyMovies} title="Comedy Movies" />
        <Carousel films={dramaMovies} title="Drama Movies" />
      </main>
    </div>
  );
}
