//https://github.com/momentechnologies/moment-hooks

import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T | any[], delay: number): T | any[] => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [Array.isArray(value) ? value : [value]]);

  return debouncedValue;
};

/*
const [inputValue, setInputValue] = React.useState("A value");
const debouncedInputValue = useDebounce(inputValue, 100);
*/
