"use client"
import React from "react";
import { DialogComponent } from "@/types/types";
import dialogs from "@/dialogs/dialogs";

export interface GLobalDialogContext {
  id: string;
  open: boolean;
  openDialog: (id: string) => void;
  closeDialog: () => void;
}

const INITIAL_STATE: GLobalDialogContext = {
  id: "",
  open: false,
  openDialog: () => null,
  closeDialog: () => null,
};

const GlobalDialogContext =
  React.createContext<GLobalDialogContext>(INITIAL_STATE);

export function useGlobalDialog () {
  return React.useContext(GlobalDialogContext);
}

export function GlobalDialogProvider (
  {
    children
  }: React.ComponentPropsWithoutRef<React.ElementType>
) {
  const [state, setState] = React.useState<GLobalDialogContext>(INITIAL_STATE);

  const openDialog = React.useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      id: id,
      open: true,
    }));
  }, []);

  const closeDialog = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  const Current = dialogs[state.id];
  return (
    <>
      <GlobalDialogContext.Provider
        value={{
          ...state,
          openDialog,
          closeDialog
        }}
      >
        {children}
      </GlobalDialogContext.Provider>

      {/* Place global Dialogs in here */}
      {state.open && (
        <Current
          {...{
            open: state.open,
            onOpenChange: (open) => setState(prev => ({...prev, open}))
          }}
        />
      )}
    </>
  )
}