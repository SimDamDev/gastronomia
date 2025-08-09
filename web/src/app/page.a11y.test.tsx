import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Home from './page';

jest.mock('@/components/RecipeList', () => ({
  RecipeList: () => <div>Liste mock</div>,
}));

describe('Home a11y', () => {
  it('n’a pas de violations a11y', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
