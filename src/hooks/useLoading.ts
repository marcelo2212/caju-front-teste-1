import { useState, useCallback } from 'react';

export const useLoading = (initialState: boolean) => {
  const [loading, setLoading] = useState(initialState);

  const setLoadingCallback = useCallback((state: boolean) => {
    setLoading(state);
  }, []);

  return [loading, setLoadingCallback] as const;
};
