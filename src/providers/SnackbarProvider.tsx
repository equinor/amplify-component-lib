import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { Snackbar, SnackbarProps } from '@equinor/eds-core-react';

export interface State {
  showSnackbar: (text?: string, customProps?: SnackbarProps) => void;
}

const SnackbarContext = createContext<State | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error(
      'useSnackbar must be used within a SnackbarContextProvider'
    );
  }
  return context;
};

export type SnackbarContextProviderProps = {
  children: ReactNode;
} & SnackbarProps;

const SnackbarContextProvider: FC<SnackbarContextProviderProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>(props);

  const showSnackbar = (text?: string, customProps?: SnackbarProps) => {
    if (customProps) {
      setSnackbarProps(customProps);
    } else {
      setSnackbarProps(props);
    }

    if (text) {
      setSnackbarText(text);
    }

    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {props.children}
      <Snackbar
        open={open}
        onClose={() => {
          setOpen(false);
          if (snackbarProps.onClose) {
            snackbarProps.onClose();
          }
        }}
        autoHideDuration={snackbarProps.autoHideDuration}
        placement={snackbarProps.placement}
      >
        {snackbarText}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
