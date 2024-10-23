import { Movie } from "@/types/movie.types";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface WishlistContextProps {
  wishlist: Movie[];
  addToWishlist: (film: Movie) => void;
  removeFromWishlist: (filmId: number) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  const addToWishlist = (film: Movie) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === film.id) ? prev : [...prev, film]
    );
  };

  const removeFromWishlist = (filmId: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== filmId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
