import { useEffect, useRef, useState } from 'react';

const useSearchQuery = () => {
  const storedValueRef = useRef('default');
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    storedValueRef.current = value;
    console.log('VALUEREF IS: ', storedValueRef.current);
  }, [value]);

  useEffect(() => {
    const storedValue = localStorage.getItem('searchValue') || '';
    storedValueRef.current = storedValue;
    setValue(storedValue);

    return () => {
      console.log('SETTING VALUE REF: ', storedValueRef.current);
      localStorage.setItem('searchValue', storedValueRef.current);
    };
  }, []);

  return { value, setValue };
};

export default useSearchQuery;
