"use client"
import React from "react";  
import dialogs from "@/dialogs/dialogs";

/**
 * All dialogs must be placed in some part of the DOM in the document.
 * This Provides ensures that this dialogs are placed in the top of the document,
 * right inside of the "root" class element in a container. All the dialogs are 
 * listed in the @/dialogs/dialogs.ts in an object inside this file, this way
 * components that need to be SSR rendered are loaded in the server rendering.
 */


/**
 * Interfaces
 */
export interface GLobalDialogContext {
  id: string;
  open: boolean;
  openDialog: (id: string) => void;
  closeDialog: () => void;
}

/**
 * Global Variables
 */

const INITIAL_STATE: GLobalDialogContext = {
  id: "",
  open: false,
  openDialog: () => null,
  closeDialog: () => null,
};

const GlobalDialogContext =
  React.createContext<GLobalDialogContext>(INITIAL_STATE);

/**
 * Hooks
 */

export function useGlobalDialog () {
  return React.useContext(GlobalDialogContext);
}

/**
 * Components
 */

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

  if (state.id && Current === undefined) {
    console.error(`Dialog with ID: ${state.id} is not registered`);
  }

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

      {/* Dialogs are placed here */}
      {state.open && Current && (
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