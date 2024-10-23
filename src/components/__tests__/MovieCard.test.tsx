import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie.types";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockMovie: Movie = {
  id: 1,
  title: "The Matrix",
  poster_path: "/path/to/poster.jpg",
  overview: "A computer programmer discovers a mysterious world...",
  release_date: "1999-03-31",
  vote_average: 8.7,
  tagline: "",
  runtime: 0,
  genres: [],
  production_companies: [],
};

const renderMovieCard = (film: Movie = mockMovie) => {
  return render(
    <BrowserRouter>
      <MovieCard film={film} />
    </BrowserRouter>
  );
};

describe("MovieCard Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the movie card with correct title and poster", () => {
    renderMovieCard();

    expect(screen.getByText("The Matrix")).toBeInTheDocument();
    const poster = screen.getByAltText("The Matrix") as HTMLImageElement;
    expect(poster).toBeInTheDocument();
    expect(poster.src).toContain(
      "https://image.tmdb.org/t/p/w200/path/to/poster.jpg"
    );
  });

  it("navigates to the film detail page when clicked", () => {
    renderMovieCard();
    fireEvent.click(screen.getByText("The Matrix").closest(".movie-card")!);
    expect(mockNavigate).toHaveBeenCalledWith("/film/1");
  });

  it("works within a list of movies", () => {
    const movies: Movie[] = [
      mockMovie,
      {
        ...mockMovie,
        id: 2,
        title: "The Matrix Reloaded",
        poster_path: "/path/to/poster2.jpg",
      },
    ];

    render(
      <BrowserRouter>
        <div data-testid="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.id} film={movie} />
          ))}
        </div>
      </BrowserRouter>
    );

    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getByText("The Matrix")).toBeInTheDocument();
    expect(screen.getByText("The Matrix Reloaded")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = renderMovieCard();
    expect(container).toMatchSnapshot();
  });

  it("updates when film prop changes", () => {
    const { rerender } = renderMovieCard();
    const newMovie: Movie = {
      id: 2,
      title: "New Movie Title",
      poster_path: "/new/path/poster.jpg",
      overview: "New movie description",
      release_date: "2024-01-01",
      vote_average: 8.0,
      tagline: "",
      runtime: 0,
      genres: [],
      production_companies: [],
    };

    rerender(
      <BrowserRouter>
        <MovieCard film={newMovie} />
      </BrowserRouter>
    );

    expect(screen.getByText("New Movie Title")).toBeInTheDocument();
  });
});
