import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { Button, Snackbar, SnackbarProps } from '@equinor/eds-core-react';

interface ShowSnackbarSettings {
  customProps?: SnackbarProps;
  action?: {
    text: string;
    handler: () => void;
    disabled?: boolean;
  };
}

export interface State {
  showSnackbar: (text: string, props?: ShowSnackbarSettings) => void;
  setActionDisabledState: (disabled: boolean) => void;
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
  const [snackbarAction, setSnackbarAction] =
    useState<ShowSnackbarSettings['action']>();

  const showSnackbar = (
    text: string,
    snackbarSettings?: ShowSnackbarSettings
  ) => {
    setSnackbarText(text);
    setSnackbarProps(snackbarSettings?.customProps ?? props);
    setSnackbarAction(snackbarSettings?.action ?? undefined);
    setOpen(true);
  };

  const setActionDisabledState = (disabled: boolean) => {
    setSnackbarAction((currentState) =>
      currentState
        ? {
            ...currentState,
            disabled,
          }
        : currentState
    );
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, setActionDisabledState }}>
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
            <Button
              disabled={snackbarAction.disabled}
              variant="ghost"
              onClick={snackbarAction.handler}
            >
              {snackbarAction.text}
            </Button>
          </Snackbar.Action>
        )}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
