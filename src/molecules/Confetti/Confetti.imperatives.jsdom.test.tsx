import { act } from 'react';

import { boomConfetti } from './imperatives/boomConfetti';
import { showerConfetti } from './imperatives/showerConfetti';

it('boomConfetti mounts the confetti container into the DOM', () => {
  act(() => {
    document.body.innerHTML = '';
    boomConfetti();
  });
  expect(document.body.children.length).toBe(1);
  expect(document.body.firstChild?.nodeName).toBe('DIV');
});

it('boomConfetti cleans up after itself', () => {
  vi.useFakeTimers();
  act(() => {
    document.body.innerHTML = '';
    boomConfetti();

    vi.advanceTimersByTime(2000);
    expect(document.body.children.length).toBe(1);
    vi.advanceTimersByTime(2000);
    expect(document.body.children.length).toBe(0);
  });
});

it('showerConfetti mounts the confetti container into the DOM', () => {
  vi.useFakeTimers();
  act(() => {
    document.body.innerHTML = '';
    showerConfetti();
  });
  expect(document.body.children.length).toBe(1);
  expect(document.body.firstChild?.nodeName).toBe('DIV');
});

it('showerConfetti cleans up after itself', () => {
  vi.useFakeTimers();
  act(() => {
    document.body.innerHTML = '';
    showerConfetti();

    vi.advanceTimersByTime(4000);
    expect(document.body.children.length).toBe(1);
    vi.advanceTimersByTime(2000);
    expect(document.body.children.length).toBe(0);
  });
});
