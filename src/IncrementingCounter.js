import React, { useState, useEffect, useRef } from 'react';

const IncrementingCounter = ({ step = 1, delay = 500, max = Infinity }) => {
  const [counter, setCounter] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const timeoutRef = useRef(null);

  const handleIncrement = () => {
    if (counter + step <= max) {
      setCounter(counter + step);
    }
  };

  const handleDecrement = () => {
    setCounter((prevCounter) => prevCounter - step);
  };

  const handleReset = () => {
    setCounter(0);
  };

  const handleClick = (action) => {
    const now = Date.now();
    if (now - lastClickTime >= delay) {
      action();
      setLastClickTime(now);
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        action();
        setLastClickTime(Date.now());
      }, delay - (now - lastClickTime));
    }
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => handleClick(handleIncrement)}>Increment</button>
      <button onClick={() => handleClick(handleDecrement)}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default IncrementingCounter;
