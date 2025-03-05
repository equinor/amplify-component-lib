import {
  createContext,
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

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
import { useApiErrorSnackbar } from 'src/providers/SnackbarProvider/hooks/useApiErrorSnackbar';

export interface ShowSnackbarSettings {
  customProps?: SnackbarProps;
  action?: {
    text: string;
    handler: (event: MouseEvent<HTMLButtonElement>) => void;
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
  showAPIErrors?: boolean;
} & SnackbarProps;

/**
 * @param children - Children to render under the SnackbarProvider
 * @param showAPIErrors - Set default query options for showing API errors, defaults to true
 */
export const SnackbarProvider: FC<SnackbarProviderProps> = ({
  children,
  showAPIErrors = true,
  ...initialSnackbarProps
}) => {
  const [open, setOpen] = useState(false);
  const [showingSnackbar, setShowingSnackbar] = useState<
    ShowSnackbar | undefined
  >(undefined);
  const [snackbarProps, setSnackbarProps] =
    useState<SnackbarProps>(initialSnackbarProps);
  const [snackbarAction, setSnackbarAction] =
    useState<ShowSnackbarSettings['action']>();

  const showSnackbar = useCallback(
    (
      showSnackbar: string | ShowSnackbar,
      snackbarSettings?: ShowSnackbarSettings
    ) => {
      if (typeof showSnackbar === 'string') {
        setShowingSnackbar({ text: showSnackbar, variant: 'info' });
      } else {
        setShowingSnackbar(showSnackbar);
      }
      setSnackbarProps(snackbarSettings?.customProps ?? initialSnackbarProps);
      setSnackbarAction(snackbarSettings?.action ?? undefined);
      setOpen(true);
    },
    [initialSnackbarProps]
  );

  useApiErrorSnackbar({ showAPIErrors, showSnackbar });

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
      {children}
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
