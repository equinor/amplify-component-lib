import { renderHook } from '@testing-library/react';

import { useStatusNavigation } from './useStatusNavigation';

import { describe, expect, it, vi } from 'vitest';

// Mock the useRouter hook
const mockNavigate = vi.fn();
const mockHistory = {
  length: 1,
  go: vi.fn(),
};

vi.mock('@tanstack/react-router', () => ({
  useRouter: vi.fn(() => ({
    navigate: mockNavigate,
    history: mockHistory,
  })),
}));

describe('useStatusNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHistory.length = 1;
  });

  it('should return a navigation function', () => {
    const { result } = renderHook(() => useStatusNavigation());

    expect(typeof result.current).toBe('function');
  });

  it('should call custom onBackClick when provided', () => {
    const onBackClick = vi.fn();
    const { result } = renderHook(() => useStatusNavigation({ onBackClick }));

    result.current();

    expect(onBackClick).toHaveBeenCalledTimes(1);
    expect(mockHistory.go).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should call history.go(-1) when history length > 1 and no custom callback', () => {
    mockHistory.length = 2;
    const { result } = renderHook(() => useStatusNavigation());

    result.current();

    expect(mockHistory.go).toHaveBeenCalledWith(-1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should navigate to fallback URL when no history and fallback URL provided', () => {
    mockHistory.length = 1;
    const redirectFallbackUrl = '/dashboard';
    const { result } = renderHook(() =>
      useStatusNavigation({ redirectFallbackUrl })
    );

    result.current();

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/dashboard' });
    expect(mockHistory.go).not.toHaveBeenCalled();
  });

  it('should navigate to root when no history and no fallback URL', () => {
    mockHistory.length = 1;
    const { result } = renderHook(() => useStatusNavigation());

    result.current();

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
    expect(mockHistory.go).not.toHaveBeenCalled();
  });

  it('should handle empty options object', () => {
    const { result } = renderHook(() => useStatusNavigation({}));

    result.current();

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
  });

  it('should prioritize onBackClick over other navigation methods', () => {
    const onBackClick = vi.fn();
    mockHistory.length = 3; // Has history
    const { result } = renderHook(() =>
      useStatusNavigation({
        onBackClick,
        redirectFallbackUrl: '/dashboard',
      })
    );

    result.current();

    expect(onBackClick).toHaveBeenCalledTimes(1);
    expect(mockHistory.go).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should work with all possible option combinations', () => {
    const onBackClick = vi.fn();
    const { result } = renderHook(() =>
      useStatusNavigation({
        onBackClick,
        redirectFallbackUrl: '/custom-fallback',
      })
    );

    result.current();

    expect(onBackClick).toHaveBeenCalledTimes(1);
  });
});
