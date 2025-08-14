import { useEffect, useRef, useState } from 'react';

import { Button, LinearProgressProps, Progress } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react-vite';

import page from 'src/molecules/Progress/Linear/Linear.docs.mdx';
import { Stack, useMockProgress } from 'src/storybook';

const meta: Meta<typeof Progress.Linear> = {
  title: 'Molecules/Progress Indicators/Linear',
  component: Progress.Linear,
  parameters: {
    docs: {
      page,
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Stack
          style={{
            padding: '32px',
          }}
        >
          <Story />
        </Stack>
      );
    },
  ],
};

export default meta;

export const Introduction: StoryFn<LinearProgressProps> = (args) => {
  const { value = 0, variant } = args;
  const progress = useMockProgress(variant === 'indeterminate' ? null : value);

  return (
    <Progress.Linear
      value={progress}
      {...args}
      aria-label="Progress bar label"
    />
  );
};

export const Indeterminate: StoryFn<LinearProgressProps> = () => (
  <Progress.Linear aria-label="Progress bar label" />
);

export const Determinate: StoryFn<LinearProgressProps> = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(setTimeout(() => null));
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && buttonRef.current && timer.current) {
      buttonRef.current.focus();
    }
  }, [isLoading]);

  const resetProgress = () => {
    setProgress(0);
    setIsLoading(true);
    timer.current = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setIsLoading(false);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1500);
  };

  return (
    <div aria-busy={isLoading} aria-live="polite">
      {isLoading ? (
        <Progress.Linear
          variant="determinate"
          aria-label="loading determinate linear progress test"
          value={progress}
        />
      ) : (
        <Button ref={buttonRef} onClick={resetProgress}>
          Trigger progress
        </Button>
      )}
    </div>
  );
};

export const Accessibility: StoryFn<LinearProgressProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(() => null, 100)
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const resetProgress = () => {
    setIsLoading(true);
    timer.current = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  };
  return (
    <div aria-live="assertive">
      {isLoading ? (
        <Progress.Linear aria-label="Loading linear accessibility test" />
      ) : (
        <Button
          ref={buttonRef}
          onClick={resetProgress}
          aria-disabled={isLoading}
        >
          Click to load
        </Button>
      )}
    </div>
  );
};
