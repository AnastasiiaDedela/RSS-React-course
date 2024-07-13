import { useEffect, useRef, useState } from 'react';

const useSearchQuery = (storageKey: string) => {
  const storedValueRef = useRef('');
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    storedValueRef.current = value;
  }, [value]);

  useEffect(() => {
    const storedValue = localStorage.getItem(storageKey) || '';
    // storedValueRef.current = storedValue;
    setValue(storedValue);

    return () => {
      localStorage.setItem(storageKey, storedValueRef.current);
    };
  }, []);

  return { value, setValue };
};

export default useSearchQuery;

let a = 5;

const f = () => {
  console.log(a);
};

a += 76;

f();

console.log(a);
