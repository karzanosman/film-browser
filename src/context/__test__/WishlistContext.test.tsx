import { Movie } from '@/types/movie.types'
import { fireEvent, render, screen } from '@testing-library/react'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useWishlist, WishlistProvider } from '../WishlistContext'


const TestComponent = () => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()

  return (
    <div>
      <div data-testid="wishlist-count">{wishlist.length}</div>
      <button onClick={() => addToWishlist({ id: 1, title: 'Test Movie' } as Movie)}>Add Movie</button>
      <button onClick={() => removeFromWishlist(1)}>Remove Movie</button>
      {wishlist.map((movie: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) => (
        <div key={movie.id} data-testid={`movie-${movie.id}`}>
          {movie.title}
        </div>
      ))}
    </div>
  )
}

describe('WishlistContext', () => {
  it('provides initial empty wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')
  })

  it('adds a movie to the wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    fireEvent.click(screen.getByText('Add Movie'))

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')
    expect(screen.getByTestId('movie-1')).toHaveTextContent('Test Movie')
  })

  it('removes a movie from the wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    fireEvent.click(screen.getByText('Add Movie'))
    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')

    fireEvent.click(screen.getByText('Remove Movie'))
    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0')
    expect(screen.queryByTestId('movie-1')).not.toBeInTheDocument()
  })

  it('does not add duplicate movies to the wishlist', () => {
    render(
      <WishlistProvider>
        <TestComponent />
      </WishlistProvider>
    )

    fireEvent.click(screen.getByText('Add Movie'))
    fireEvent.click(screen.getByText('Add Movie'))

    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('1')
  })

  it('throws an error when useWishlist is used outside of WishlistProvider', () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow('useWishlist must be used within a WishlistProvider')

    consoleErrorMock.mockRestore()
  })
})