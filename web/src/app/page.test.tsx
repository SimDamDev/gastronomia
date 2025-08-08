import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('affiche un titre', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /gastronomia/i })).toBeInTheDocument();
  });
});
