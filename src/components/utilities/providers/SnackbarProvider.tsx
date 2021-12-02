import React, { useState } from 'react';
import { Snackbar, SnackbarProps } from '@equinor/eds-core-react';

export interface State {
  showSnackbar: (text?: string, customProps?: SnackbarProps) => void;
}

export const SnackbarContext = React.createContext<State | undefined>(
  undefined
);

const SnackbarContextProvider: React.FC<SnackbarProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
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
