import React, { useState, useEffect, useRef, useCallback } from 'react';
import randomColor from 'randomcolor';
import ColorPicker from './ColorPicker';
import useWindowSize from './WindowSize';
import Name from './Name';
import Canvas from './Canvas';
import RefreshButton from './RefreshButton';

export default function Paint () {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  useEffect(() => {
    getColors();
  }, []);

  const getColors = useCallback(() => {
    const baseColor = randomColor().slice(1);
    const url = `https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setColors(res.colors.map(color => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      })
      .catch(err => console.error(err));
  }, []);
  
  const [visible, setVisible] = useState(false);
  let timeoutId = useRef();
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setVisible(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => setVisible(false), 1000);
  });

  return (
    <div className='app'>
      <header style={{ borderTop: `10px solid ${activeColor}` }}>
        <div>
          <Name />
        </div>
        <div style={{ marginTop: 10 }}>
          <ColorPicker
            colors={colors}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
          <RefreshButton cb={getColors}/>
        </div>
      </header>
      {activeColor && (
        <Canvas
          color={activeColor}
          height={window.innerHeight}
        />
      )}
      <div className={`window-size ${visible ? '' : 'hidden'}`}>
        {windowWidth} x {windowHeight}
      </div>
    </div>
  );
}
