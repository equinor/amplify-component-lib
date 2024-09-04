import { isCurrentUrl } from './MenuItem.utils';

describe('isCurrentUrl', () => {
  it('returns true when replace is true and hasPathDrilling is true and currentUrl includes link', () => {
    expect(
      isCurrentUrl({
        currentUrl: '/collections/123',
        link: '/collections',
        replace: true,
        hasPathDrilling: true,
      })
    ).toBe(true);
  });

  it('returns false when replace is true and hasPathDrilling is true and currentUrl does not include link', () => {
    expect(
      isCurrentUrl({
        currentUrl: '/products/123',
        link: '/collections',
        replace: true,
        hasPathDrilling: true,
      })
    ).toBe(false);
  });

  it('returns true when replace is true and hasPathDrilling is false and currentUrl equals link', () => {
    expect(
      isCurrentUrl({
        currentUrl: '/collections',
        link: '/collections',
        replace: true,
        hasPathDrilling: false,
      })
    ).toBe(true);
  });

  it('returns false when replace is true and hasPathDrilling is false and currentUrl does not equal link', () => {
    expect(
      isCurrentUrl({
        currentUrl: '/collections/123',
        link: '/collections',
        replace: true,
        hasPathDrilling: false,
      })
    ).toBe(false);
  });

  it('returns true when replace is false and currentUrl includes link', () => {
    expect(
      isCurrentUrl({
        currentUrl: '/collections/123',
        link: '/collections',
        replace: false,
        hasPathDrilling: false,
      })
    ).toBe(true);
  });

  it('returns false when replace is false and currentUrl does not include link', () => {
    expect(
      isCurrentUrl({
        currentUrl: '/products/123',
        link: '/collections',
        replace: false,
        hasPathDrilling: false,
      })
    ).toBe(false);
  });

  it('returns false when currentUrl is undefined', () => {
    expect(
      isCurrentUrl({
        currentUrl: undefined,
        link: '/collections',
        replace: true,
        hasPathDrilling: true,
      })
    ).toBe(false);
  });
});
