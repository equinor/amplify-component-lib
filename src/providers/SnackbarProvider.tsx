import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { Button, Snackbar, SnackbarProps } from '@equinor/eds-core-react';

interface ShowSnackbarProps {
  text: string;
  customProps?: SnackbarProps;
  action?: {
    text: string;
    handler: () => void;
  };
}

export interface State {
  showSnackbar: (props: ShowSnackbarProps) => void;
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
  const [snackbarAction, setSnackbarAction] = useState<null | {
    text: string;
    handler: () => void;
  }>(null);

  const showSnackbar = (snackbarProps?: ShowSnackbarProps) => {
    if (snackbarProps?.customProps) {
      setSnackbarProps(snackbarProps?.customProps);
    } else {
      setSnackbarProps(props);
    }

    if (snackbarProps?.text) {
      setSnackbarText(snackbarProps?.text);
    }

    if (snackbarProps?.action) {
      setSnackbarAction({
        ...snackbarProps.action,
      });
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
        {snackbarAction && (
          <Snackbar.Action>
            <Button variant="ghost" onClick={snackbarAction.handler}>
              {snackbarAction.text}
            </Button>
          </Snackbar.Action>
        )}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
