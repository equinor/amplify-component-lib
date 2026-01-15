import React, { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import { Confetti } from 'src/molecules/Confetti/Confetti';
import { IMPERATIVE_STYLING } from 'src/molecules/Confetti/Confetti.constants';
import {
  ConfettiBoomProps,
  ConfettiProps,
  ConfettiShowerProps,
} from 'src/molecules/Confetti/Confetti.types';

type ConfettiEvent = {
  id: string;
  props: ConfettiProps;
};

type ConfettiContextValue = {
  boom: (props?: ConfettiBoomProps) => void;
  shower: (props?: ConfettiShowerProps) => void;
};

const ConfettiContext = createContext<ConfettiContextValue | null>(null);

export const ConfettiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<ConfettiEvent[]>([]);

  const boom = useCallback((props: ConfettiBoomProps = {}) => {
    const defaultedProps: ConfettiBoomProps = {
      mode: 'boom',
      effectCount: 1,
    };
    setEvents((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        effectCount: 1,
        props: { ...defaultedProps, ...props },
      },
    ]);
  }, []);

  const shower = useCallback(
    (props: ConfettiShowerProps = { mode: 'shower' }) => {
      const defaultedProps: ConfettiShowerProps = {
        mode: 'shower',
        duration: 2000,
      };

      setEvents((prev) => [
        ...prev,
        { id: crypto.randomUUID(), props: { ...defaultedProps, ...props } },
      ]);
    },
    []
  );

  /* v8 ignore start */
  const remove = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };
  /* v8 ignore end */

  return (
    <ConfettiContext.Provider value={{ boom, shower }}>
      {children}

      {createPortal(
        <>
          {events.map(({ id, props }) => (
            <Confetti
              key={id}
              {...props}
              /* v8 ignore next */
              onComplete={() => remove(id)}
              style={IMPERATIVE_STYLING}
            />
          ))}
        </>,
        document.body
      )}
    </ConfettiContext.Provider>
  );
};

export function useConfetti() {
  const ctx = useContext(ConfettiContext);
  if (!ctx) {
    throw new Error('useConfetti must be used inside ConfettiProvider');
  }
  return ctx;
}
