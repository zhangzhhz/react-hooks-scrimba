import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import randomColor from 'randomcolor';
import Name from './components/Name';

export default function Playground() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(null);
  const inputRef = useRef();
  useEffect(() => {
    setColor(randomColor());
    inputRef.current.focus();
  }, [count]);
  const calculate = useCallback(<Calculate cb={()=>{}} num={count} />, [count]);
  const cbOrig = (num) => {
    console.log(num);
  };
  const cb = useMemo(() => cbOrig, [count]);

  return (
    <div
      style={{borderTop: `10px solid ${color}`}}
    >
      {count}
      <button onClick={() => setCount(count => count - 1)}>-</button>
      <button onClick={() => setCount(count => count + 1)}>+</button>
      <button onClick={() => setColor(randomColor())}>Change Color</button>
      <hr/>
      <input ref={inputRef} type="range" value={count} onChange={e => setCount(Math.floor(e.target.value))} />
      <hr/>
      <Calculate cb={()=>{}} num={count} />
      {calculate}
      <Calculate cb={cb} num={count} />
    </div>
  );
}

const Calculate = React.memo(function ({ cb, num }) {
  cb(num);
  const renderCount = useRef(1);
  return <div>{renderCount.current++}</div>
});