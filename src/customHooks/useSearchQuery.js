import { useEffect, useRef, useState } from 'react';
const useSearchQuery = (storageKey) => {
    const storedValueRef = useRef('');
    const [value, setValue] = useState('');
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
