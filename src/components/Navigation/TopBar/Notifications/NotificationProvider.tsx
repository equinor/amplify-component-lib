import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface NotificationContext {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

const NotificationContext = createContext<NotificationContext | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationContext must be used within a Notification provider'
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NotificationContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
