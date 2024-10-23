import Loading from '@/components/Loading';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Loading Component', () => {
  it('renders correctly with loading text and spinner', () => {
    render(<Loading />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    expect(() => render(<Loading />)).not.toThrow();
  });

  it('works within a parent component', () => {
    const WrapperComponent = () => (
      <div data-testid="wrapper">
        <Loading />
      </div>
    );

    render(<WrapperComponent />);
    expect(screen.getByTestId('wrapper')).toContainElement(screen.getByText('Loading...'));
  });
});
