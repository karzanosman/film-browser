import MovieCard from "@/components/MovieCard";
import "@/styles/Carousel.scss";
import { Movie } from "@/types/movie.types";

interface CarouselProps {
  films: Movie[];
  title: string;
}

export default function Carousel({ films, title }: CarouselProps) {
  return (
    <div className="carousel">
      <h2>{title}</h2>
      <div className="carousel-items">
        {films.map((film) => (
          <MovieCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
}
