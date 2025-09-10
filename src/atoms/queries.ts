import React from 'react';
import { atom, useAtom } from 'jotai';

export const refetchQueriesAtom = atom<{ [key: string]: number }>({});

export function useQueriesNotifyer () {
  const [queries, setQueries] = useAtom(refetchQueriesAtom);

  const refetch = React.useCallback((name: string) => {
    setQueries((prev: { [key: string]: number }) => {
      return {
        ...prev,
        [name]: (prev[name] || 0) + 1,
      };
    });
  }, [queries]);

  return {
    queries,
    refetch,
  };
}