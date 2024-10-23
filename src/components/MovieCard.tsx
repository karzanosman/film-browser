import "@/styles/MovieCard.scss";
import { Movie } from "@/types/movie.types";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  film: Movie;
}

export default function MovieCard({ film }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/film/${film.id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
        alt={film.title}
      />
      <p>{film.title}</p>
    </div>
  );
}
