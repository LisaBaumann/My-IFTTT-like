import { useState, useRef, useEffect } from 'react';

export default function InputWithAutoWidth({ value }) {
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState('auto');

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(`${Object(inputRef.current).scrollWidth}px`);
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      value={value}
      style={{ width: inputWidth }}
    />
  );
}
