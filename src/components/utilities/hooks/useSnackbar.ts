import { useContext } from "react";
import { SnackbarContext } from "../providers/SnackbarProvider";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbarContext must be used within a SnackbarContextProvider");
  }
  return context;
};