import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { spacings } from 'src/atoms/style';
import { Toast, type ToastProps } from 'src/molecules/Toast/Toast';

import { AnimatePresence, motion } from 'motion/react';
import styled from 'styled-components';

const Container = styled(motion.div)`
  position: fixed;
  top: ${spacings.medium};
  right: ${spacings.medium};
  display: flex;
  flex-direction: column-reverse;
  z-index: 9999;
`;

interface ToastContextType {
  showToast: (props: string | Omit<ToastProps, 'onClose'>) => void;
  hideAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToasts() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToasts must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode | ReactNode[];
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [activeToasts, setActiveToasts] = useState<
    (ToastProps & { uuid: string })[]
  >([]);

  const handleOnRemoveToast = (uuid: string) => {
    setActiveToasts((prev) => prev.filter((toast) => toast.uuid !== uuid));
  };

  const handleHideAllToasts = () => {
    setActiveToasts([]);
  };

  const handleShowToast: ToastContextType['showToast'] = (props) => {
    const newToastUuid = crypto.randomUUID();
    const newToast: ToastProps & { uuid: string } = {
      uuid: newToastUuid,
      ...(typeof props === 'string' ? { title: props } : props),
      onClose: () => handleOnRemoveToast(newToastUuid),
    };
    setActiveToasts((prev) => [...prev, newToast]);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast: handleShowToast,
        hideAllToasts: handleHideAllToasts,
      }}
    >
      <Container layoutRoot>
        <AnimatePresence>
          {activeToasts.map((toast) => (
            <motion.div
              key={toast.uuid}
              layout
              initial={{
                opacity: 0,
                x: '100%',
                marginBottom: spacings.medium,
              }}
              animate={{ opacity: 1, x: 0, marginBottom: spacings.medium }}
              exit={{ opacity: 0, x: '100%', height: 0, marginBottom: 0 }}
              transition={{
                type: 'spring',
                duration: 0.4,
              }}
            >
              <Toast {...toast} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Container>
      {children}
    </ToastContext.Provider>
  );
};
