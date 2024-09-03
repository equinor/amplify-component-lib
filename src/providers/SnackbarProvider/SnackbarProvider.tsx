import { createContext, FC, ReactNode, useContext, useState } from 'react';

import {
  Button,
  Icon,
  Snackbar,
  SnackbarProps,
  Typography,
} from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';

import { StyledSnackbar } from './SnackbarProvider.styles';
import { snackbarIcon } from './SnackbarProvider.utils';

interface ShowSnackbarSettings {
  customProps?: SnackbarProps;
  action?: {
    text: string;
    handler: () => void;
    disabled?: boolean;
  };
}

export interface ShowSnackbar {
  text: string;
  variant: 'info' | 'warning' | 'error';
}

export interface State {
  showSnackbar: (
    text: string | ShowSnackbar,
    props?: ShowSnackbarSettings
  ) => void;
  setActionDisabledState: (disabled: boolean) => void;
  hideSnackbar: () => void;
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

export type SnackbarProviderProps = {
  children: ReactNode;
} & SnackbarProps;

export const SnackbarProvider: FC<SnackbarProviderProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [showingSnackbar, setShowingSnackbar] = useState<
    ShowSnackbar | undefined
  >(undefined);
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>(props);
  const [snackbarAction, setSnackbarAction] =
    useState<ShowSnackbarSettings['action']>();

  const showSnackbar = (
    showSnackbar: string | ShowSnackbar,
    snackbarSettings?: ShowSnackbarSettings
  ) => {
    if (typeof showSnackbar === 'string') {
      setShowingSnackbar({ text: showSnackbar, variant: 'info' });
    } else {
      setShowingSnackbar(showSnackbar);
    }
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

  const hideSnackbar = () => setOpen(false);

  const handleOnClose = () => {
    setOpen(false);
    if (snackbarProps.onClose) {
      snackbarProps.onClose();
    }
  };

  return (
    <SnackbarContext.Provider
      value={{ showSnackbar, setActionDisabledState, hideSnackbar }}
    >
      {props.children}
      <StyledSnackbar
        $variant={showingSnackbar?.variant}
        open={open}
        onClose={handleOnClose}
        autoHideDuration={snackbarProps.autoHideDuration}
        placement={snackbarProps.placement}
      >
        {showingSnackbar && (
          <Icon data={snackbarIcon(showingSnackbar.variant)} />
        )}
        <Typography variant="body_short">{showingSnackbar?.text}</Typography>
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
        <Button variant="ghost_icon" onClick={handleOnClose}>
          <Icon data={close} />
        </Button>
      </StyledSnackbar>
    </SnackbarContext.Provider>
  );
};
