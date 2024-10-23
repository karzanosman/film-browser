import Carousel from "@/components/Carousel";
import { Movie } from "@/types/movie.types";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/MovieCard", () => ({
  default: ({ film }: { film: Movie }) => (
    <div data-testid="movie-card" data-movie-id={film.id}>
      {film.title}
    </div>
  ),
}));

const mockFilms: Movie[] = [
  {
    id: 1,
    title: "The Matrix",
    poster_path: "/path/to/poster1.jpg",
    overview: "",
    tagline: "",
    release_date: "",
    runtime: 0,
    genres: [],
    production_companies: [],
    vote_average: 0,
  },
  {
    id: 2,
    title: "Inception",
    poster_path: "/path/to/poster2.jpg",
    overview: "",
    tagline: "",
    release_date: "",
    runtime: 0,
    genres: [],
    production_companies: [],
    vote_average: 0,
  },
];

const renderCarousel = (props: { films: Movie[]; title: string }) => {
  return render(
    <BrowserRouter>
      <Carousel {...props} />
    </BrowserRouter>
  );
};

describe("Carousel Component", () => {
  it("renders correctly based on provided films", () => {
    renderCarousel({ films: mockFilms, title: "Popular Movies" });

    expect(screen.getByText("Popular Movies")).toBeInTheDocument();

    const movieCards = screen.getAllByTestId("movie-card");
    expect(movieCards).toHaveLength(2);

    expect(movieCards[0]).toHaveAttribute("data-movie-id", "1");
    expect(movieCards[0]).toHaveTextContent("The Matrix");
    expect(movieCards[1]).toHaveAttribute("data-movie-id", "2");
    expect(movieCards[1]).toHaveTextContent("Inception");
  });

  it("renders empty carousel when no films are provided", () => {
    renderCarousel({ films: [], title: "Popular Movies" });
    expect(screen.queryAllByTestId("movie-card")).toHaveLength(0);
  });

  it("has correct structure with carousel and carousel-items classes", () => {
    renderCarousel({ films: mockFilms, title: "Popular Movies" });
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(document.querySelector(".carousel")).toBeInTheDocument();
    expect(document.querySelector(".carousel-items")).toBeInTheDocument();
  });
});
