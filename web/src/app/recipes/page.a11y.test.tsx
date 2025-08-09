import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import RecipesPage from './page';

declare global {
  // eslint-disable-next-line no-var
  var fetch: jest.Mock;
}

describe('Recipes page a11y', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => ({ ok: true, json: async () => [] })) as unknown as jest.Mock;
  });

  it('n’a pas de violations a11y', async () => {
    const { container } = render(<RecipesPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
