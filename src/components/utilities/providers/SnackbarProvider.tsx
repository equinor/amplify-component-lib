import React, { useState } from "react";
import { Snackbar, SnackbarProps } from "@equinor/eds-core-react";

export interface State {
  setSnackbarText: (val: string) => void;
  showSnackbar: (customProps?: SnackbarProps) => void;
}

export const SnackbarContext = React.createContext<State>({
  setSnackbarText: () => null,
  showSnackbar: () => null,
});

const SnackbarContextProvider: React.FC<SnackbarProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState("");
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>(props);

  const showSnackbar = (customProps?: SnackbarProps) => {
    if (customProps) {
      setSnackbarProps(customProps);
    } else {
      setSnackbarProps(props);
    }

    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ setSnackbarText, showSnackbar }}>
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
