import { Dispatch, SetStateAction, useState } from 'react';

export const useControllState = <T>(defaultValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(defaultValue);

  const handleSetState: Dispatch<SetStateAction<T>> = (newState) => {
    if (newState === state) {
      return;
    }

    setState(newState);
  };

  return [state, handleSetState];
};
